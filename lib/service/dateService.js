import moment from "moment";

const DateService = {
    convertDateObjectToStringFormat: function (dateObject, stringFormat) {
        if (!(dateObject instanceof moment)) {
            dateObject = moment(dateObject);
        }
        return dateObject.format(stringFormat);
    },
}

export default DateService;