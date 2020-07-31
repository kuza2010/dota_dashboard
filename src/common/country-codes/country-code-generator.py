import json

import requests
from bs4 import BeautifulSoup

image_path = 'http://www.fao.org/fileadmin/assets/countries/flags/'


def get_html(url):
    return requests.get(url).text


soup = BeautifulSoup(get_html("http://www.fao.org/countryprofiles/iso3list/en"), 'lxml')
table = soup.find('table')
rows = table.find_all('tr')
final_codes = []

for row in rows:
    tds = row.find_all('td')
    if len(tds) > 4:
        country = tds[1].get_text()
        iso2 = tds[3].get_text().lower()
        iso3 = tds[2].get_text().lower()
        link = image_path + iso3 + '.gif'

        final_codes.append({'country': country, 'iso2': iso2, 'iso3': iso3, 'image': link})

f = open("country-codes.json", "w")
f.write(json.dumps(final_codes))
f.close()