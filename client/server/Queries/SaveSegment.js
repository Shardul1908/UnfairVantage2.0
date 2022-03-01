import SavedSegmentsInit from "../Models/Saved_Segments/Saved_Segments";

export default async function saveTheSegment(
  shopId,
  startDate,
  endDate,
  title,
  noOfCustomers
) {
  let savedSegments = SavedSegmentsInit(shopId);
  savedSegments.sync();
  let segment = {};
  segment["title"] = title;
  segment["start_date"] = startDate;
  segment["end_date"] = endDate;
  segment["number_of_customers"] = noOfCustomers;
  //segment["filters"] = filters;
  console.log(segment);
  console.log(segment.title);
  console.log(segment.start_date);
  console.log(segment.end_date);
  console.log(segment.number_of_customers);
}
