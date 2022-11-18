import React, {useEffect, useState} from "react";
import {VehicleApi} from "../data/vehicles/api";
import {vehicleTypes, vehicleTypeTitles} from "../data/vehicles/contracts";

export const Filter: React.FC<{ setFilteredVehicles: any }> = ({setFilteredVehicles}) => {

    const [search, setSearch] = useState<string>('');
    const [select, setSelect] = useState<number>(-1);

    let vehicleTypesOptions = [];
    for (let key of vehicleTypes) {
        vehicleTypesOptions.push(<option key={key} value={key}>{vehicleTypeTitles[key]}</option>)
    }

    const handleFilterVehicles = (newVehicles: any) => {
        setFilteredVehicles(newVehicles);
    }

    useEffect(() => {
        console.log(search);
        let filteredVehicles = VehicleApi.search({type: select === -1 ? null : Number(select), title: search ? String(search) : ''});
        console.log(filteredVehicles);
        filteredVehicles ? handleFilterVehicles(filteredVehicles) : '';
    }, [search, select])

    return (
        <>
            <div>
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
                <select value={select} onChange={(e) => setSelect(Number(e.target.value))}>
                    <option key='-1' value='-1'>Выберите тип ТС</option>
                    {vehicleTypesOptions}
                </select>
            </div>
        </>
    );
}
