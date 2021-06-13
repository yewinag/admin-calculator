import {
  calculatePrice,
  day_production_units,
  dayCount,
  getTotalCost,
  getTotalUnit,
  getLocationList,
} from "../src/utils/helper";
import moment from "moment";
import { dateFormat } from "../src/constants";
// mock data example
const product = {
  id: "1",
  name: "Flyer - One Sided",
  max_production: {
    1: 5000,
    2: 8000,
    3: 12000,
  },
  price_per_unit: 0.5,
};
const location = {
  id: "1",
  createdAt: "2020-06-29T18:20:23.578Z",
  lat: 13.7370587,
  long: 100.5603061,
  name: "Asoke",
  fee: 1000,
  max_dist: 1000,
};
const date = moment().add(1, "days").format(dateFormat);
const selectedLocation = [
  {
    id: "1",
    name: "Asoke",
    total_unit: 1000,
    total_cost: 4100,
  },
  {
    id: "3",
    name: "Chidlom",
    total_unit: 2000,
    total_cost: 6600,
  },
];

describe("day count due to user selected", () => {
  // if give product and date as parameter => return max production unit
  it("should calculate day production unit", () => {
    expect(dayCount(date)).toBe(1);
    expect(dayCount(date)).not.toBe(2);
  });
});
describe("Calculate production units helper function", () => {
  // if give product and date as parameter => return max production unit
  it("should calculate day production unit", () => {
    expect(day_production_units(product, date)).toBe(5000);
    expect(day_production_units(product, date)).not.toBe(8000);
  });
});
describe("calculate unit and cost", () => {
  // check return object => value should equal to mock data calculation => true
  it("should calculate price due to max distribution", () => {
    expect(calculatePrice(product, location, date).name).toBe("Asoke");
    expect(calculatePrice(product, location, date).total_unit).toBe(1000);
    expect(calculatePrice(product, location, date).total_cost).toBe(1500);
  });
  // check return object => value should equal to mock data calculation => false
  it("should calculate price due to max distribution", () => {
    expect(calculatePrice(product, location, date).name).not.toBe("Chidlom");
    expect(calculatePrice(product, location, date).total_unit).not.toBe(3000);
    expect(calculatePrice(product, location, date).total_cost).not.toBe(4500);
  });
  // check return error => isErr
  it("should calculate price due to max distribution", () => {
    expect(calculatePrice(null, location, date).isErr).toBe(true);
    expect(calculatePrice(product, null, date).isErr).toBe(true);
    expect(calculatePrice(product, location, null).isErr).toBe(true);
  });
});
describe("calculate Total costs", () => {
  it("should return total of user selected items cost", () => {
    expect(getTotalCost(selectedLocation)).toBe(10700);
    expect(getTotalCost(selectedLocation)).not.toBe(10800);
  });
});
describe("calculate Total units", () => {
  it("should return total of user selected items units", () => {
    expect(getTotalUnit(selectedLocation)).toBe(3000);
    expect(getTotalUnit(selectedLocation)).not.toBe(6000);
  });
});
describe("generate array for payload to sent cart api ", () => {
  it("should return reformated array first item id", () => {
    expect(getLocationList(selectedLocation)[0].id).toBe(1);
    expect(getLocationList(selectedLocation)[0]).not.toBe("1");
  });
  it("should return reformated array first item quantity", () => {
    expect(getLocationList(selectedLocation)[0].quantity).toBe(1000);
    expect(getLocationList(selectedLocation)[0].quantity).not.toBe("1000");
  });
});
