import moment from "moment";

export const dayCount = (date) => {
  return moment(date).format("DD") - moment().format("DD"); // difference of today and selected day
};
export const day_production_units = (product, date) => {
  const real_production_day =
    dayCount(date) > product.max_production.length
      ? product.max_production.length
      : dayCount(date); // production_per_day depen on user selected date
  return product.max_production[real_production_day]; // return production units due to selected date
};
export const calculatePrice = (product, location, date) => {
  let error = {};
  let new_location_item = {};
  // inital
  if (product == null) {
    error = { isErr: true, msg: "You need to select product" };
    return error;
  }
  if (date == null) {
    error = { isErr: true, msg: "You need to select valid date" };
    return error;
  }
  if (location == null) {
    error = { isErr: true, msg: "You need to pick the locations" };
    return error;
  }

  if (!!product && !!location && !!date) {
    new_location_item["name"] = location.name; // set name to new obj
    new_location_item["id"] = location.id; // set id to new obj
    if (location.max_dist < day_production_units(product, date)) {
      // max distribute of location less than product_per_day amount use max
      new_location_item["total_unit"] = location.max_dist;
      new_location_item["total_cost"] =
        location.max_dist * product.price_per_unit + // max_product * price
        dayCount(date) * location.fee; // distribute days (3) * daily fee
    } else {
      new_location_item["total_dist"] = day_production_units(product, date);
      new_location_item["total_cost"] =
        day_production_units(product, date) * product.price_per_unit +
        dayCount(date) * location.fee;
    }
  }
  return new_location_item; // return new location and price and unit item
};

export const getTotalCost = (locationList) => {
  let total = 0;
  locationList.map((item) => {
    total += item.total_cost;
  });
  return total;
};
export const getTotalUnit = (locationList) => {
  let total = 0;
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
