import React from "react";
import defaultLocales from "./locales";
import EventBoard from "./EventBoard";

const defaultOptions = {
    googleBoard: "YOUR_GOOGLE_DASHBOARD_URL",
    googleZone: "GOOGLE_ZONE",
    googleProjectId: "YOUR_GOOGLE_PROJECT_ID",
};

export default ({
    onGetStats,
    onRepublishFail,
    onRepublishError,
    onRepublishPreconditionFail,
    onRepublishSingleError,
    onCleanAnomaly,
    onPopulateMissing,
    onFixMissing,
    onMarkAsFail,
    onMarkAsSuccess,
    onMarkSingleAsSuccess,
    onCalculateStats,
    onCalculateSingleStats,
    onGetError,
    onGetEvent,
    onUpdateEvent,
    locales = {},
    options = {},
    render,
}) => {
    return (
        <EventBoard
            getStats={onGetStats}
            republishFail={onRepublishFail}
            republishError={onRepublishError}
            republishPreconditionFail={onRepublishPreconditionFail}
            republishSingleError={onRepublishSingleError}
            cleanAnomaly={onCleanAnomaly}
            populateMissing={onPopulateMissing}
            fixMissing={onFixMissing}
            markAsFail={onMarkAsFail}
            markAsSuccess={onMarkAsSuccess}
            markSingleAsSuccess={onMarkSingleAsSuccess}
            calculateStats={onCalculateStats}
            calculateSingleStats={onCalculateSingleStats}
            getError={onGetError}
            getEvent={onGetEvent}
            updateEvent={onUpdateEvent}
            render={render}
            locales={{ ...defaultLocales, ...locales }}
            options={{ ...defaultOptions, ...options }}
        />
    );
};
