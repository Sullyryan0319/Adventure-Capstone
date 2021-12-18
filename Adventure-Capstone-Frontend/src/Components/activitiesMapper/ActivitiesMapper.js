import React from "react";


const ActivitiesMapper = ({ activities }) => {

  return (
    <div>
      <ul>
        {activities.map((user, i) =>
          user.activityList.includes(activity) ? (
            <li>
              {" "}        
              <ul>
                <li>Activities: {user.activity}</li>{" "}
              </ul>            
            </li>            
          ) : null
        )}
      </ul>
    </div>
  );
};

export default ActivitiesMapper;
