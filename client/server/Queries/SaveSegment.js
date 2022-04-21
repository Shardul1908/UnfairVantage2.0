import SavedSegmentsInit from "../Models/Saved_Segments/Saved_Segments";

export async function saveTheSegment(shopId, startDate, endDate, title, noOfCustomers, customFilters) {
  
  let savedSegments = SavedSegmentsInit(shopId);
  savedSegments.sync();

  let filters = JSON.stringify(customFilters);
  // let jsonfilters = JSON.parse(filters);
  // console.log(jsonfilters);

  let start_date = null;
  let end_date = null;

  if(startDate !== null) {
    start_date = startDate.toString();
  }
  if(endDate !== null) {
    end_date = endDate.toString();
  }

  let segment = {};
  segment["title"] = title;
  segment["start_date"] = start_date;
  segment["end_date"] = end_date;
  segment["number_of_customers"] = noOfCustomers;
  segment["filters"] = filters;

  savedSegments
    .create(segment)
    .catch(err => {
      console.log(err);
    });
}
