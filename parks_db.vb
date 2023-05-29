``` create database called "parks_db"
use parks_db
switched to db parks_db

``` create collections "parkinfo", "visitors", and "yelp"
parks_db> db.createCollection("parkinfo")
{ ok: 1 }
parks_db> db.createCollection("visitors")
{ ok: 1 }
parks_db> db.createCollection("yelp")
{ ok: 1 }
parks_db> show collections
parkinfo
yelp

``` check to make sure all collections exist within parks_db 
parks_db> show collections
parkinfo
visitors
yelp


``` import data from park output folder into respective collection
mongoimport --type json -d parks_db -c parkinfo --drop --jsonArray park_info.json

``` import data from visitors output folder into respective collection
``` used csv import since there were no json output files
mongoimport --type csv -d parks_db  -c visitors --headerline --drop park_visitor.csv

``` import data from yelp output folder into respective collection
mongoimport --type json -d parks_db -c yelp --drop --jsonArray yelp_info.json 

``` check to see if data imported correctly in parkinfo collection
parks_db> db.parkinfo.findOne()
{
  _id: ObjectId("64701878c662f4d2130f0c0c"),
  Name: 'Adams National Historical Park',
  'Park ID': 'E4C7784E-66A0-4D44-87D0-3E072F5FEF43',
  'Park Code': 'adam',
  Designation: 'National Historical Park',
  Latitude: '42.2553961',
  Longitude: '-71.01160356',
  'Entrance Fee': '15.00',
  'Entrance Fee Desc': "Access into the historic homes is by a ticketed, timed tour.  Every individual in your party must have a ticket.  It is strongly recommended that tickets be purchased in advance on Adams National Historical Park's Recreation.gov page.",
  State: 'MA'
}

``` check to see if data imported correctly in yelp collection
parks_db> db.yelp.findOne()
{
  _id: ObjectId("647028208109c7d0fbc3c82b"),
  name: 'Adams NHP',
  fullParkName: 'Adams National Historical Park',
  parkCode: 'adam',
  state: 'MA',
  stateName: 'Massachusetts',
  yelpRating: 4.5
}

``` check to see if data imported correctly in visitors collection
parks_db> db.visitors.findOne()
{
  _id: ObjectId("647028cd9d9bd4ea5330e61a"),
  Park: 'Abraham Lincoln Birthplace NHP',
  'Full Park Name': 'Abraham Lincoln Birthplace National Historical Park',
  'Jan-22': 5833,
  'Feb-22': 10174,
  'Mar-22': 16447,
  'Apr-22': 25848,
  'May-22': 30360,
  'Jun-22': 36056,
  'Jul-22': 36369,
  'Aug-22': 32346,
  'Sep-22': 31130,
  'Oct-22': 21857,
  'Nov-22': 12503,
  'Dec-22': 6784,
  totalVisitors2022: 265707,
  parkID: '77E0D7F0-1942-494A-ACE2-9004D2BDC59E',
  parkCode: 'abli',
  Designation: 'National Historical Park',
  Latitude: 37.5858662,
  Longitude: -85.67330523,
  entranceFee: 'Free',
  entranceFeeDesc: '',
  State: 'KY'
}
