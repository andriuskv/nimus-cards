import React from "react";

export default function Icon({ name }) {
    function getIcon(name) {
        switch (name) {
            case "edit":
                return `M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18, 2.9 17.35,2.9 16.96,
                    3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z`;
            case "remove":
                return `M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z`;
            case "switch":
                return `M21,9L17,5V8H10V10H17V13M7,11L3,15L7,19V16H14V14H7V11Z`;
            case "media":
                return `M21,17H7V3H21M21,1H7A2,2 0 0,0 5,3V17A2,2 0 0,0 7,19H21A2,2 0 0,0 23,
                    17V3A2,2 0 0,0 21,1M3,5H1V21A2,2 0 0,0 3,23H19V21H3M15.96,10.29L13.21,13.83L11.25,
                    11.47L8.5,15H19.5L15.96,10.29Z`;
            case "responsive":
                return `M22,17H18V10H22M23,8H17A1,1 0 0,0 16,9V19A1,1 0 0,0 17,20H23A1,1 0 0,0 24,19V9A1,
                    1 0 0,0 23,8M4,6H22V4H4A2,2 0 0,0 2,6V17H0V20H14V17H4V6Z`;
        }
    }
    return (
        <svg className="icon" viewBox="0 0 24 24">
            <path d={getIcon(name)} />
        </svg>
    );
}
