import moment from "moment";
export const calculatePrice = (product, location, date) => {
  var error = {};
  let selected_day = 0;
  let product_per_day = 0;
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
  if (location.length <= 0) {
    error = { isErr: true, msg: "You need to pick the locations" };
    return error;
  }

  if (!!product && !!location && !!date) {
    selected_day = moment(date).format("DD"); // user selected day
    const today = moment().format("DD"); // today
    const dayCount = selected_day - today; // difference of today and selected day
    const real_production_day =
      dayCount > product.max_production.length
        ? product.max_production.length
        : dayCount; // production_per_day depen on user selected date

    product_per_day = product.max_production[real_production_day];
    new_location_item["name"] = location.name; // set name to new obj
    new_location_item["id"] = location.id; // set id to new obj
    if (location.max_dist < product_per_day) {
      // max distribute of location less than product_per_day amount use max
      new_location_item["total_unit"] = location.max_dist;
      new_location_item["total_cost"] =
        location.max_dist * product.price_per_unit + // max_product * price
        real_production_day * location.fee; // distribute days (3) * daily fee
    } else {
      new_location_item["total_dist"] = product_per_day;
      new_location_item["total_cost"] =
        product_per_day * product.price_per_unit +
        real_production_day * location.fee;
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
  total;
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
