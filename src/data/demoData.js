
export const apartments = [
  { id: "APT-101", apartmentNo: "A-101", block: "A", floor: 1, type: "2 BHK", area: "950 sq.ft.", status: "Occupied" },
  { id: "APT-102", apartmentNo: "A-102", block: "A", floor: 1, type: "3 BHK", area: "1250 sq.ft.", status: "Occupied" },
  { id: "APT-201", apartmentNo: "B-201", block: "B", floor: 2, type: "2 BHK", area: "980 sq.ft.", status: "Available" },
  { id: "APT-301", apartmentNo: "C-301", block: "C", floor: 3, type: "3 BHK", area: "1300 sq.ft.", status: "Occupied" },
];


export const residents = [
  { id: 101, name: "Mehul", apartment: "A-101", phone: "9876543210", email: "mehul@example.com", role: "Owner", status: "Active" },
  { id: 102, name: "Arpit", apartment: "A-102", phone: "9876501234", email: "arpit@example.com", role: "Tenant", status: "Active" },
  { id: 103, name: "Chakshu", apartment: "C-301", phone: "9876512340", email: "chakshu@example.com", role: "Owner", status: "Active" },
  { id: 104, name: "Sagar", apartment: "B-201", phone: "9876523456", email: "sagar@example.com", role: "Tenant", status: "Inactive" },
  { id: 105, name: "Akshit", apartment: "A-201", phone: "9876534567", email: "akshit@example.com", role: "Owner", status: "Active" },
  { id: 106, name: "Chirag", apartment: "B-102", phone: "9876545678", email: "chirag@example.com", role: "Tenant", status: "Active" },
  { id: 107, name: "Pravindra", apartment: "C-202", phone: "9876556789", email: "pravindra@example.com", role: "Owner", status: "Active" },
];


export const maintenance = [
  { id: "BILL-001", apartment: "A-101", resident: "Rahul Sharma", month: "October 2026", amount: "₹3,500", dueDate: "10 Oct 2026", status: "Paid" },
  { id: "BILL-002", apartment: "A-102", resident: "Priya Verma", month: "October 2026", amount: "₹3,500", dueDate: "10 Oct 2026", status: "Pending" },
  { id: "BILL-003", apartment: "C-301", resident: "Aman Gupta", month: "October 2026", amount: "₹4,000", dueDate: "10 Oct 2026", status: "Overdue" },
  { id: "BILL-004", apartment: "B-201", resident: "Neha Kapoor", month: "October 2026", amount: "₹3,500", dueDate: "10 Oct 2026", status: "Pending" },
];

export const payments = [
  { id: "PAY-1001", resident: "Rahul Sharma", billId: "BILL-001", date: "21 Oct 2026", amount: "₹3,500", method: "UPI", status: "Paid" },
  { id: "PAY-1002", resident: "Priya Verma", billId: "BILL-002", date: "20 Oct 2026", amount: "₹3,500", method: "Bank Transfer", status: "Paid" },
  { id: "PAY-1003", resident: "Aman Gupta", billId: "BILL-003", date: "19 Oct 2026", amount: "₹4,000", method: "Cash", status: "Pending" },
];

export const complaints = [
  { id: "CMP-201", title: "Water leakage in bathroom", apartment: "A-203", category: "Plumbing", priority: "High", assignedTo: "Ramesh Kumar", status: "In Progress" },
  { id: "CMP-202", title: "Lift maintenance required", apartment: "B-Block", category: "Electrical", priority: "Medium", assignedTo: "Suresh Singh", status: "Open" },
  { id: "CMP-203", title: "Garden lights not working", apartment: "C-101", category: "Electrical", priority: "Low", assignedTo: "Ramesh Kumar", status: "Resolved" },
  { id: "CMP-204", title: "Water supply issue", apartment: "A-202", category: "Plumbing", priority: "High", assignedTo: "Unassigned", status: "Open" },
];

export const staff = [
  { id: "ST-01", name: "Ramesh Kumar", role: "Electrician", department: "Maintenance", phone: "9811100011", status: "Active" },
  { id: "ST-02", name: "Suresh Singh", role: "Security Guard", department: "Security", phone: "9811100022", status: "Active" },
  { id: "ST-03", name: "Meena Devi", role: "Housekeeping", department: "Cleaning", phone: "9811100033", status: "Active" },
  { id: "ST-04", name: "Vijay Yadav", role: "Plumber", department: "Maintenance", phone: "9811100044", status: "Inactive" },
];

export const parking = [
  { id: "PK-01", slot: "A-P01", location: "Basement A", vehicle: "DL 3C AB 1234", resident: "Rahul Sharma", type: "Car", status: "Occupied" },
  { id: "PK-02", slot: "A-P02", location: "Basement A", vehicle: "DL 3C CD 5678", resident: "Priya Verma", type: "Car", status: "Occupied" },
  { id: "PK-03", slot: "B-P01", location: "Basement B", vehicle: "—", resident: "—", type: "Car", status: "Available" },
  { id: "PK-04", slot: "G-012", location: "Ground Floor", vehicle: "DL 8S EF 9012", resident: "Aman Gupta", type: "Bike", status: "Occupied" },
];

export const amenities = [
  { id: "AM-01", name: "Clubhouse", location: "Block A", capacity: 100, fee: "₹2,000", status: "Available" },
  { id: "AM-02", name: "Swimming Pool", location: "Central Area", capacity: 30, fee: "₹500", status: "Available" },
  { id: "AM-03", name: "Community Hall", location: "Block C", capacity: 150, fee: "₹3,000", status: "Reserved" },
  { id: "AM-04", name: "Gymnasium", location: "Block B", capacity: 25, fee: "₹0", status: "Under Maintenance" },
];

export const visitors = [
  { id: "VIS-001", name: "Arjun Mehta", apartment: "A-101", purpose: "Personal Visit", entry: "10:15 AM", exit: "10:50 AM", status: "Completed" },
  { id: "VIS-002", name: "Delivery Partner", apartment: "A-102", purpose: "Parcel Delivery", entry: "11:20 AM", exit: "—", status: "Active" },
  { id: "VIS-003", name: "Electrician", apartment: "C-301", purpose: "Repair Work", entry: "12:05 PM", exit: "—", status: "Active" },
];
