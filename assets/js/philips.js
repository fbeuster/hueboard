hueboard.philips = {
  classNameMap : {
    'Attic' : 'Attic',
    'Balcony' : 'Balcony',
    'Barbecue' : 'Barbecue',
    'Bathroom' : 'Bathroom',
    'Bedroom' : 'Bedroom',
    'Carport' : 'Carport',
    'Closet' : 'Closet',
    'Computer' : 'Computer',
    'Dining' : 'Dining',
    'Downstairs' : 'Downstairs',
    'Driveway' : 'Driveway',
    'Front door' : 'FrontDoor',
    'Garage' : 'Garage',
    'Garden' : 'Garden',
    'Guest room' : 'GuestRoom',
    'Gym' : 'Gym',
    'Hallway' : 'Hallway',
    'Home' : 'Home',
    'Kids bedroom' : 'KidsBedroom',
    'Kitchen' : 'Kitchen',
    'Laundry room' : 'LaundryRoom',
    'Living room' : 'LivingRoom',
    'Lounge' : 'Lounge',
    'Man cave' : 'ManCave',
    'Music' : 'Music',
    'Nursery' : 'Nursery',
    'Office' : 'Office',
    'Other' : 'Other',
    'Pool' : 'Pool',
    'Porch' : 'Porch',
    'Reading' : 'Reading',
    'Recreation' : 'Recreation',
    'Staircase' : 'Staircase',
    'Storage' : 'Storage',
    'Studio' : 'Studio',
    'Terrace' : 'Terrace',
    'Toilet' : 'Toilet',
    'Top floor' : 'TopFloor',
    'TV' : 'TV',
    'Upstairs' : 'Upstairs'
  },
  fileNameMap : {
    'Attic' : 'roomsAttic',
    'Balcony' : 'roomsBalcony',
    'Barbecue' : 'roomsSocialtime',
    'Bathroom' : 'roomsBathroom',
    'Bedroom' : 'roomsBedroom',
    'Carport' : 'roomsCarport',
    'Closet' : 'roomsCloset',
    'Computer' : 'roomsComputer',
    'Dining' : 'roomsDining',
    'Downstairs' : 'zonesAreasGroundfloor',
    'Driveway' : 'roomsDriveway',
    'Front door' : 'roomsFrontdoor',
    'Garage' : 'roomsGarage',
    'Garden' : 'roomsOutdoor',
    'Guest room' : 'roomsGuestRoom',
    'Gym' : 'roomsGym',
    'Hallway' : 'roomsHallway',
    'Home' : 'tabbarHome',
    'Kids bedroom' : 'roomsKidsbedroom',
    'Kitchen' : 'roomsKitchen',
    'Laundry room' : 'roomsLaundryroom',
    'Living room' : 'roomsLiving',
    'Lounge' : 'roomsLounge',
    'Man cave' : 'roomsMancave',
    'Music' : 'otherMusic',
    'Nursery' : 'roomsNursery',
    'Office' : 'roomsOffice',
    'Other' : 'roomsOther',
    'Pool' : 'roomsPool',
    'Porch' : 'roomsPorch',
    'Reading' : 'otherReading',
    'Recreation' : 'roomsRecreation',
    'Staircase' : 'roomsStaircase',
    'Storage' : 'roomsStorage',
    'Studio' : 'roomsStudio',
    'Terrace' : 'roomsTerrace',
    'Toilet' : 'roomsToilet',
    'Top floor' : 'zonesAreasSecondFloor',
    'TV' : 'otherWatchingMovie',
    'Upstairs' : 'zonesAreasFirstfloor'
  },

  mapToClassName : function(groupClass)
  {
    if (groupClass in hueboard.philips.classNameMap)
    {
      return hueboard.philips.classNameMap[groupClass];
    }

    return 'Other';
  },

  mapToFileName : function(groupClass)
  {
    if (groupClass in hueboard.philips.fileNameMap)
    {
      return hueboard.philips.fileNameMap[groupClass] + '.png';
    }

    return 'roomsOther.png';
  }
}