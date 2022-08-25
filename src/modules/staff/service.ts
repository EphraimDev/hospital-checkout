import { Customer, Staff } from "../../database/models";
import { CustomerInput } from "../../database/models/Customer";
import { StaffInput } from "../../database/models/Staff";

class StaffService {
  static async findOneStaff(query: StaffInput) {
    const staff = await Staff.findOne({ where: query });
    return staff;
  }

  static async findAllStaff(query: StaffInput) {
    const staff = await Staff.findAll({ where: query });
    return staff;
  }

  static async createStaff(payload: StaffInput) {
    const staff = await Staff.create(payload);
    return staff;
  }

  static async findOneCustomer(query: CustomerInput) {
    const customer = await Customer.findOne({ where: query });
    return customer;
  }

  static async createCustomer(payload: CustomerInput) {
    const customer = await Customer.create(payload);
    return customer;
  }

  static async findAllCustomers(query: CustomerInput) {
    const customers = await Customer.findAll({ where: query });
    return customers;
  }

  static async updateStaff(staff: Staff, payload: StaffInput) {
    for (const key in payload) {
      if (Object.prototype.hasOwnProperty.call(payload, key)) {
        const val = payload[key];
        staff[key] = val;
      }
    }
    await staff.save();
    return staff;
  }
}

export default StaffService;
