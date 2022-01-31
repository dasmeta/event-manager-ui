import React, { useCallback, useEffect, useState } from "react";
import { Input } from "antd";
import Actions from "./components/Actions";
import EventList from "./components/List";
import Links from "./components/Links";

export default ({
    locales,
    options,
    getStats,
    republishFail,
    republishError,
    republishPreconditionFail,
    republishSingleError,
    cleanAnomaly,
    populateMissing,
    fixMissing,
    markAsFail,
    markAsSuccess,
    markSingleAsSuccess,
    calculateStats,
    calculateSingleStats,
    getError,
    getEvent,
    updateEvent,
    render,
}) => {
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const [filterKey, setFilterKey] = useState("");
    const [searchValue, setSearchValue] = useState("");

    const refresh = useCallback(() => {
        setLoading(true);
        getStats().then(list => {
            setList(list);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        refresh()
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => { setFilterKey(searchValue); }, 1000);
        return () => clearTimeout(timer);
    }, [searchValue])

    const renderSearch = () => (
        <Input.Search size="large" allowClear={true} onChange={e => setSearchValue(e.target.value)} value={searchValue} />
    );

    const renderLinks = () => (<Links options={options} locales={locales} />);

    const renderActions = () => (
        <Actions 
            locales={locales} 
            calculateStats={calculateStats}
            filterKey={searchValue}
            setFilterKey={setSearchValue}
            refresh={refresh}
            list={list}
        />
    );

    const renderList = () => (
        <EventList
            options={options}
            locales={locales}
            loading={loading}
            refresh={refresh}
            list={list}
            filterKey={filterKey}
            getEvent={getEvent}
            getError={getError}
            calculateSingleStats={calculateSingleStats}
            republishSingleError={republishSingleError}
            republishError={republishError}
            republishFail={republishFail}
            republishPreconditionFail={republishPreconditionFail}
            markSingleAsSuccess={markSingleAsSuccess}
            markAsSuccess={markAsSuccess}
            markAsFail={markAsFail}
            populateMissing={populateMissing}
            fixMissing={fixMissing}
            cleanAnomaly={cleanAnomaly}
            updateEvent={updateEvent}
        />
    );

    if (render) {
        return render({ 
            title: locales.events, 
            renderActions, 
            renderSearch, 
            renderLinks, 
            renderList
        });
    }

    return (
        <>
            {renderActions()}
            {renderSearch()}
            {renderLinks()}
            {renderList()}
        </>
    );
};
