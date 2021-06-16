import moment from "moment";

export const dayCount = (date) => {
  return moment(date).format("DD") - moment().format("DD"); // difference of today and selected day
};
export const day_production_units = (product, date) => {
  const real_production_day =
    dayCount(date) > Object.keys(product.max_production).length
      ? Object.keys(product.max_production).length
      : dayCount(date); // production_per_day depen on user selected date
      
  return product.max_production[real_production_day]; // return production units due to selected date
};
export const calculatePrice = (product, location, date) => {  
  let location_product_item = {};
  if (!!product && !!location && !!date) {
    location_product_item["name"] = location.name; // set name to new obj
    location_product_item["id"] = location.id; // set id to new obj
    if (location.max_dist < day_production_units(product, date)) {
      // max distribute of location less than product_per_day amount use max
      location_product_item["total_unit"] = location.max_dist;
      location_product_item["total_cost"] =
        location.max_dist * product.price_per_unit + // max_product * price
        dayCount(date) * location.fee; // distribute days (3) * daily fee
    } else {
      location_product_item["total_dist"] = day_production_units(product, date);
      location_product_item["total_cost"] =
        day_production_units(product, date) * product.price_per_unit +
        dayCount(date) * location.fee;
    }
  }
  return location_product_item; // return new location and price and unit item
};

export const isError = (product, location, date) => product == null || location == null || date == null;

export const isErrorMsg = (product, location, date) => {
  let error = {};
  if (product == null) {
    error = { msg: "You need to select product" };
    return error;
  }
  if (date == null) {
    error = { msg: "You need to select valid date" };
    return error;
  }
  if (location == null) {
    error = { msg: "You need to pick the location" };
    return error;
  }
  return error;
}

export const getTotalCost = (locationList) => {
  let total = 0;
  if(locationList.length == 0) return null;
  locationList.map((item) => {
    total += item.total_cost;
  });
  return total;
};
export const getTotalUnit = (locationList) => {
  let total = 0;
  if(locationList.length == 0) return null;
  locationList.map((item) => {
    total += item.total_unit;
  });
  return total;
};
export const getLocationList = (locations) => {
  let list = [];
  locations.map((item) => {
    list.push({
      id: parseInt(item.id),
      quantity: item.total_unit,
    });
  });
  return list;
};
