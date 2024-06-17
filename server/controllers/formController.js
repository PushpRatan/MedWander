const FormEntry = require("../models/FormEntry");
const excel = require("exceljs");
const path = require("path");

exports.submitForm = async (req, res) => {
  const { formType, name, countryCode, phoneNumber } = req.body;
  try {
    const entry = await FormEntry.create({
      form_type: formType,
      name,
      country_code: countryCode,
      phone_number: phoneNumber,
    });
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEntries = async (req, res) => {
  try {
    const entries = await FormEntry.findAll();
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.refreshExcel = async (req, res) => {
  try {
    const forms = await Form.findAll();
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet("Forms");

    worksheet.columns = [
      { header: "Form Type", key: "formType", width: 10 },
      { header: "Name", key: "name", width: 30 },
      { header: "Country Code", key: "countryCode", width: 10 },
      { header: "Phone Number", key: "phoneNumber", width: 15 },
    ];

    forms.forEach((form) => {
      worksheet.addRow(form);
    });

    const filePath = path.join(__dirname, "../../form_entries.xlsx");
    await workbook.xlsx.writeFile(filePath);
    res.status(200).json({ message: "Excel sheet updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating Excel sheet" });
  }
};
