import Sequelize from "sequelize";
import { sequelize } from "../../global";

//Saved Segments Table Defination
function SavedSegmentsInit(shopId) {
  const Segment = sequelize.define(`${shopId}_Saved_Segments`, {
    id: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    start_date: {
      type: Sequelize.DATE,
      defaultValue: null,
    },
    end_date: {
      type: Sequelize.DATE,
      defaultValue: null,
    },
    number_of_customers: {
      type: Sequelize.INTEGER(10),
      allowNull: false,
      defaultValue: "0",
    },
    filters: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
  });
  return Segment;
}

export default SavedSegmentsInit;
