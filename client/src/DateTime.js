import React from 'react';

var datetime = () => {
    var showdate=new Date();
    var displaytodaydate=showdate.toDateString();
    // var displaytodaydate=showdate.getDate()+'/'+showdate.getMonth()+'/' + showdate.getFullYear();
    return(
        <div>
            <input type='text' value={displaytodaydate} readonly='true'/>
        </div>
    )
}

export default datetime;