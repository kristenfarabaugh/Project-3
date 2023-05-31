# Project-3

![Yosemite National Park](https://roadtrippingcalifornia.com/wp-content/uploads/2022/06/El-Capitan-Yosemite.jpg)

## Project Overview

The goal of this project was to collect, clean, transform and visualize data about National Park Services (NPS) Lands to help a user plan a visit to parks. Our intended user was a person who may not be typically "Outdoorsy" and so may not know huge amounts about National Park Lands, but who is interested to visit some, either nearby or as part of a road trip. The goal was to provide them some actionable and easily digestable takeaways from the wealth of data about National Parks available. The visualizations focus on National Parks proper, but also contain information about all other NPS lands, including National Monuments, Memorials, Historical Sites, etc. The full range of park designations can be found in our dashboard.

Our two hubs for showing the visualizations are:
- [<b>Map</b>](https://github.com/kristenfarabaugh/Project-3/tree/main/Data%20Visualization/Map) which shows the location of all NPS lands, where the circle is scaled to represent the number of visitors to that park. When a particular park is clicked, basic information about the park, including its designation, entrance fee, and total visitors in 2022 is displayed.
- [<b>Dashboard</b>](https://github.com/kristenfarabaugh/Project-3/tree/main/Data%20Visualization/Graph) which shows the number of visitors for each month of 2022 and how this changed across the year. This also shows the average Yelp review for a park. The designation of a park (Park, Monument, Memorial, etc.) can be selected on this dashboard and two bar charts at the bottom will show:
   - The "Hidden Gems" of that designation, which are parks with very few visitors in 2022 but that are highly rated by Yelp Users (an average 5 star rounded rating), sorted from least visited
   - The Free parks for that designation, which are parks with no entrance Fee. This is sorted from most visited to least visited, but includes all free parks.

-----

## Table of Contents
1. [<b>Overview of National Park Information</b>](https://github.com/kristenfarabaugh/Project-3/blob/main/README.md#overview-of-national-park-information)
2. [<b>Data Collection</b>](https://github.com/kristenfarabaugh/Project-3/blob/main/README.md#data-collection)
3. [<b>Data Visualizations</b>](https://github.com/kristenfarabaugh/Project-3/blob/main/README.md#data-visualizations)
   - [<b>Map Plot</b>](https://github.com/kristenfarabaugh/Project-3/blob/main/README.md#map-plot)
   - [<b>Dashboard</b>](https://github.com/kristenfarabaugh/Project-3/blob/main/README.md#dashboard)
4. [<b>Conclusions</b>](https://github.com/kristenfarabaugh/Project-3/blob/main/README.md#conclusions)

-----

## Overview of National Park Information
There were 469 NPS Properties collected in the dataset, divided into different designations (National Park, National Monument, National Memorial, etc.)

The five most common designations included in the dataset are:
| Designation | Number |
| --- | --- |
| National Monument | 79 |
| National Historic Site | 78 |
| National Historical Park | 63 |
| National Park | 51 |
| National Historic Trail | 17 |

The remaining designations having fewer properties listed under them with around 30 having fewer than 10 and around 20 having only one property in that designation.

The number of visitors at NPS properties hovers at just over 300 million each year for the previous few years (with 2020 excluded due to COVID).

In 2022 there were roughly 312 million visitors, which is down from the pre-COVID record of 330 million in 2017. The number of visitors over all NPS properties over the previous 25 years can be seen here:

![Visitors over last 25 years](https://raw.githubusercontent.com/kristenfarabaugh/Project-3/main/Output/Images%20for%20Presentation/Visitors_for_previous_25_years.png)

Of these different property types overseen by the NPS, National Parks proper have the highest number of visitors, with more than 80 million in 2022. This represents about twice the amount of visitors of any other designation.

![Visitors by designation](https://raw.githubusercontent.com/kristenfarabaugh/Project-3/main/Output/Images%20for%20Presentation/Park_visitors_by_designation.png)

-----

## Data Collection

Data was collected from a few places and later cleaned and transformed.
- [The National Park Service API](https://www.nps.gov/subjects/developer/api-documentation.htm) which contained data about the locations and entry fees of National Park Service Lands, though not visitor information.
- [National Park Visitor User Statistics](https://irma.nps.gov/Stats/) which contained data about how many visitors a National Park had each month going back for many years. This data was downloadable as csv files, but with so many parks to download data from, this process could be simplified by scraping the information.
- [Yelp API](https://fusion.yelp.com/) which contained information about average Yelp rating for the NPS Lands. This was used to let users know how parks were rated and to identify "Hidden Gems".

-----

## Data Visualizations

Two visualizations were produced to help people interested in learning more about NPS properties plan visits.

### Map Plot

![Map Plot](https://raw.githubusercontent.com/kristenfarabaugh/Project-3/main/Output/Images%20for%20Presentation/Map_all_parks.png)

The map was designed for people to see the location of parks, and find out basic information, so they could either see which properties are close to them, or plan a trip and see which properties are close to each other. The map initializes with showing the National Parks. A user can click a specific park to get more information, including the park designation, the entrance fee cost (and information) and the number of visitors last year.

The park clicked in the above image is Great Smoky Mountains National Park, and is far and away the most visited National Park with over 15 million visitors in 2022. For reference, other well-known parks (like Acadia, Yosemite, Zion, etc.) typically only attract around 4 million visitors. This could be attributable to the fact it has no entrance fee but in a cursory look, our group could not find any signifcant correlation between entrance fee cost and visitors in 2022.

![National Recreation Areas](https://raw.githubusercontent.com/kristenfarabaugh/Project-3/main/Output/Images%20for%20Presentation/map_recreation_areas.png)

A user can then select All NPS properties or specific and most visited designations to see similar information.

Another point to note from this map are that the two most visited sites of any NPS properties are actually both Recreation Areas. These are Golden Gate Recreation Area in San Francisco and Gateway Recreation Area in New Jersey, close to New York City. This is likely because these are free parks close to major cities that are also major tourism hubs.

![All Properties DC](https://github.com/kristenfarabaugh/Project-3/blob/main/Output/Images%20for%20Presentation/map_all_properties_dc.png)

Finally, by looking at all properties on the map, you can see just how many properties there are in and around Washington D.C. This probably makes some intuitive sense if you have ever visited, because popular attractions like the Lincoln Memorial and the Washington Monument are actually under the purview of the National Parks Service. You can see that many of the circles in Washington D.C. are of a similar size (indicating similar number of visitors). Again, this makes some sense since visitors to D.C. are likely to visit many of these attractions over the same stay.


### Dashboard

![Dashboard Initialization](https://raw.githubusercontent.com/kristenfarabaugh/Project-3/main/Output/Images%20for%20Presentation/Dashboard%20Initialization.png)

The second set of visualizations to help users was the information dashboard. As shown above, this inializes with Acadia National Park (the first National Park alphabetically). This dashboard shows the user some basic information like the total visitors, and the entrance fee, and how this property ranks in terms of visitorship. It also visualizes the average yelp rating, and the number of visitors per month across 2022.

For most of the NPS properties, the graph looks similar to Acadia's, with summer being the most popular time to visit almost all parks. The graph below shows the number of visitors at all NPS properties for each month in 2022:

![NPS Visitors By Month](https://raw.githubusercontent.com/kristenfarabaugh/Project-3/main/Output/Images%20for%20Presentation/Visitors_By_Month_22(All_Properties).png)

Some NPS properties have variations on this theme. For example, the peak for Indepedence Hall National Historic Park in Philadelphia peaks more visibly in July than other parks, likely owing to July 4th attracting more visitors:

![Independence NHP Visitors](https://raw.githubusercontent.com/kristenfarabaugh/Project-3/main/Output/Images%20for%20Presentation/Independence%20Hall%20NHP%20Monthly%20Visitors.png)

Great Smoky Mountains National Park also differs slightly from Acadia (as do other parks) for having notable second peaks in Autumn:

![GSM Visitors](https://raw.githubusercontent.com/kristenfarabaugh/Project-3/main/Output/Images%20for%20Presentation/Great%20Smoky%20Mountains%20Monthly%20Visitors.png)

However, some parks have the opposite pattern. National Parks like Joshua Tree and Death Valley, which are situated in the desert, typically have far fewer visitors in the summer months:

![Joshua Tree Visitors](https://raw.githubusercontent.com/kristenfarabaugh/Project-3/main/Output/Images%20for%20Presentation/Joshua%20Tree%20Monthly%20Visitors.png)

Two other visualizations were also shown on the dashboard, depending on the designation of NPS Property selected. With the end-user in mind, we thought there might be people who want to visit the parks that are not typically most visited, or may want to visit free parks only.

With this in mind, the next visualization displayed the "Hidden Gems" in this designation, which we defined as properties with the fewest visitors but a high yelp rating (an average of 5 stars, rounded up by the yelp API):

![NP Hidden Gems](https://raw.githubusercontent.com/kristenfarabaugh/Project-3/main/Output/Images%20for%20Presentation/HiddenGems.png)

The properties that could also be visited for free were also shown:

![Free Visits](https://raw.githubusercontent.com/kristenfarabaugh/Project-3/main/Output/Images%20for%20Presentation/FreeVisits.png)

-----
## Conclusions

In order to draw some conclusions for users who might be looking for NPS properties to visit, we came up with three recommendations:

- Golden Gate Recreation Area, a free and highly visited NPS property close to many of our classmates
- Great Smoky Mountains National Park, the free and most visited National Park.
- Crater Lake National Park, the second least visited National Park with an Average Five Star Yelp Review

-----
### Acknowledgements

This project was completed with contributions from J. Brammah, K. Farabaugh, A. Hussain, and G. Jimenez.
