import json

from bs4 import BeautifulSoup
import requests


def get_html(url):
    return requests.get(url).text;


soup = BeautifulSoup(get_html("https://www.nationsonline.org/oneworld/country_code_list.htm"), 'lxml')
table = soup.find('table')
rows = table.find_all('tr')

final_codes = []

for row in rows:
    tds = row.find_all('td')
    if len(tds) >= 4:
        country = tds[1].get_text().lower()
        iso2 = tds[2].get_text().lower()
        iso3 = tds[3].get_text().lower()

        final_codes.append({'country': country, 'iso2': iso2, 'iso3': iso3})

f = open("country-codes.json", "w")
f.write(json.dumps(final_codes))
f.close()
