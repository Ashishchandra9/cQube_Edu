const dataSourceInfo = {
    PM_poshan_access: {
        map: {
            pathToFile: 'pm-poshan_access-across-india.json',
            mainFilter: 'State Code',
            overallMetricsOption: false,
            locations: [
                {
                    name: "Location",
                    property: "District Name",
                    level: "district",
                    tooltip: {
                        name: "District Name"
                    }
                }
            ],
            dimensions: [
                {
                    name: "Total Enrolled",
                    property: "Enrolled In July",
                    tooltip: {
                        name: "Total Enrolled"
                    },
                    includeAsMetricFilter: true,
                },
                {
                    name: "Meal Served",
                    property: "MealServed(02/July/2022)",
                    tooltip: {
                        name: "Meal Served"
                    },
                    includeAsMetricFilter: true,
                },
                {
                    name: "Total Schools",
                    property: "Total Schools",
                    tooltip: {
                        name: "Total Schools"
                    },
                    includeAsMetricFilter: true,
                },
                {
                    name: "state_code",
                    property: "State Code"
                }
            ],
            filters: [],
            levels: [
                {
                    name: "District",
                    value: "district",
                    property: "District Name"
                }
            ],
            options: {
                legend: {
                    title: 'PM Poshan Access'
                }
            }
        }
    }
}

module.exports = dataSourceInfo;