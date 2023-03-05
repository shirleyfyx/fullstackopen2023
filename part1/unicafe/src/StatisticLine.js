import React from 'react';

const StatisticLine = ({ text, value }) => {
    if(text === "positive") {
      return (
        <div>
            {text} {value} 
        </div>
      )
    }
    else {
        return (
            <div>
                {text} {value}
            </div>
        )
    }
};


export default StatisticLine;