#!/usr/bin/env python3

import re
import argparse
import sys

parser = argparse.ArgumentParser()
parser.add_argument("-ins","--instruments", type=str, help="Instruments file", required=True)
parser.add_argument("-s", "--song", type=str, help="Song file to fill", required=True)
parser.add_argument("-o", "--output", type=str, help="Output file", required=True)

zzfx_pattern = re.compile(r'zzfx\(...(?P<instru>\[.*\])\); \/\/ (?P<name>[A-Za-z]*)')
zzfxfm_pattern = re.compile(r'.*\/\* (?P<name>[A-Za-z]*).*\*\/ \[0,,0\],?')

def load_instruments(instrument_file):

    instruments = {}
    with open(instrument_file,'r') as f:
        for line in f.read().split("\n"):
            r = re.search(zzfx_pattern, line)
            if r:
                instruments[r.group('name')] = r.group('instru')
    return instruments

def insert_instruments(song_file, instruments):
    output= ""
    with open(song_file, 'r') as f:
        for line in f.read().split("\n"):
            r = re.search(zzfxfm_pattern, line)
            if r:
                output += line.replace('[0,,0]', instruments[r.group('name')]) + '\n'
            else:
                output += line + '\n'
    return output

if __name__ ==  '__main__':
    args = parser.parse_args()
    with open(args.output, 'w') as f:
        f.write(insert_instruments(args.song, load_instruments(args.instruments)))
    sys.exit(0)

