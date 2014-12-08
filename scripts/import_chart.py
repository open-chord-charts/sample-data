#!/usr/bin/env python
# -*- coding: utf-8 -*-


# Open Chord Charts -- Database of free chord charts
# By: Christophe Benz <christophe.benz@gmail.com>
#
# Copyright (C) 2012 Christophe Benz
# https://gitorious.org/open-chord-charts/
#
# This file is part of Open Chord Charts.
#
# Open Chord Charts is free software; you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# Open Chord Charts is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.


import argparse
import json
import logging
import os
import sys

from biryani1.strings import slugify
from paste.deploy import loadapp

from openchordcharts.model.chart import Chart
from openchordcharts.model.account import Account


log = logging.getLogger(os.path.basename(__file__))


def import_chart(ctx, json_file_path, owner_username, replace=False):
    accounts_cursor = Account.find({'username': owner_username})
    if accounts_cursor.count() == 0:
        log.error(u'username "{}" not found in accounts collection'.format(owner_username))
        return None
    elif accounts_cursor.count() > 1:
        log.error(u'username "{}" corresponds to many accounts'.format(owner_username))
        return None
    account = accounts_cursor.next()
    assert account is not None
    with open(json_file_path) as _file:
        json_str = _file.read()
    json_chart = json.loads(json_str)
    chart = None
    if replace:
        chart = Chart.find_one({'slug': slugify(json_chart['title'])})
    if chart is None:
        chart = Chart()
    for key in ['composers', 'genre', 'key', 'parts', 'structure', 'title']:
        setattr(chart, key, json_chart.get(key))
    chart.account_id = account._id
    chart_id = chart.save(safe=True)
    log.debug(chart_id)
    return None


def main(args=None):
    if args is None:
        args = sys.argv[1:]
    parser = argparse.ArgumentParser(description=u'Import chords charts.')
    parser.add_argument('ini_file_path', help=u'Paste INI configuration file.')
    parser.add_argument('json_file_path', help=u'JSON file name. File can contain an object or a list of objects.')
    parser.add_argument('-o', '--owner', help=u'Set chart owner (find it by account username).')
    parser.add_argument('--replace', action='store_true', default=False, help=u'Delete chart first if exist.')
    parser.add_argument('-v', '--verbose', action='store_true', default=False, help=u'Display info messages.')
    arguments = parser.parse_args(args)
    logging.basicConfig(level=logging.DEBUG if arguments.verbose else logging.WARNING)
    app = loadapp(u'config:{}'.format(os.path.abspath(arguments.ini_file_path)))
    owner_username = arguments.owner
    if owner_username is None:
        owner_username = app.ctx.conf['dummy_login.username']
    import_chart(
        ctx=app.ctx,
        json_file_path=arguments.json_file_path,
        owner_username=owner_username,
        replace=arguments.replace,
        )
    return 0


if __name__ == '__main__':
    sys.exit(main())
