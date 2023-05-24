// webapp Url
// https://script.google.com/a/macros/mvsdschools.org/s/AKfycbzjuKAtiDvwdISp_3QcqOtExe5f8oAW1Z6U_E3Wvic7-8GLswBQL2AWU8lVJ21SHl6K/exec

// test url
// https://script.google.com/a/macros/mvsdschools.org/s/AKfycbzlrzOZmDQktlEz5nbirmcrxyygGGcQnlRJ7Q6ZxOY/dev

const appUrl =
  "https://script.google.com/a/macros/mvsdschools.org/s/AKfycbzlrzOZmDQktlEz5nbirmcrxyygGGcQnlRJ7Q6ZxOY/dev";

function doGet(e) {
  // hello
  console.log(e);

  // create a new record
  if (e.parameter.page == "create") {
    const htmlService = HtmlService.createTemplateFromFile("create")
      .evaluate()
      .addMetaTag("viewport", "width=device-width, initial-scale=1.0");
    return htmlService;
  }

  // edit a record
  if (e.parameter.page == "empNew") {

    // let thisEmployee = packageEmployeeData(e.parameter.id)

    const html = HtmlService.createTemplateFromFile("empNew");

    
    html.employeeId = e.parameter.id;

    const htmlOutput = html
      .evaluate()
      .addMetaTag("viewport", "width=device-width, initial-scale=1.0");
    return htmlOutput;
  }

  // list all records in db
  const htmlService = HtmlService.createTemplateFromFile("display")
    .evaluate()
    .addMetaTag("viewport", "width=device-width, initial-scale=1.0");
  return htmlService;
}
