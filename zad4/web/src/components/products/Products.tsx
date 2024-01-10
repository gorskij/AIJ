import React, {useEffect, useState} from 'react';
import Table from "../table/Table";
import styles from "./Products.module.css";
import TextField from '@mui/material/TextField';
import {MenuItem} from "@mui/material";

const categories = [
    {
        value: "Kategoria1",
        label: "Kategoria1"
    },
    {
        value: "Kategoria2",
        label: "Kategoria2"
    }
]

function Products({title, rows, headerRow}: { title: string, rows: string[][], headerRow: string[] }) {
    const [shownRowsCount, setShownRowsCount] = useState(10);
    const [filteredName, setFilteredName] = useState("");
    const [shownRows, setShownRows] = useState(rows);

    useEffect(() => {
        if (filteredName === "") {
            setShownRows(rows);
            return;
        }

        setShownRows(shownRows.filter((row) => compare(row[0], filteredName)));
    }, [filteredName])

    if (rows.length === 1) {
        return (
            <div>
                <Table rows={rows}/>
                Nie znaleziono wyników
            </div>
        )
    }

    const isMoreRows = shownRowsCount < rows.length;
    const showMore = () => setShownRowsCount(shownRowsCount + 10);
    const visibleRows = () => shownRowsCount < rows.length ? shownRowsCount : rows.length;

    return (
        <div className={styles.centeringContainer}>
            <h2>{title}</h2>
            <div className={styles.filters}>
                <TextField style={{marginRight: 10, width: 150}} label="Nazwa" variant="outlined"
                           onChange={(e) => {
                               setFilteredName(e.target.value)
                           }}/>
                <TextField
                    style={{width: 150}}
                    id="outlined-select-currency"
                    select
                    label="Kategoria"
                >
                    {categories.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <Table rows={[headerRow, ...shownRows.slice(0, shownRowsCount)]}/>
            {isMoreRows && <button onClick={() => showMore()}>Pokaż więcej</button>}
            <div className={styles.results}>Liczba znalezionych: {rows.length}, Widocznych: {visibleRows()}</div>
        </div>
    )
}

export default Products;

function compare(phrase: string, query: string) {
    for (let x = 0; x < query.length; x++) {
        if (query[x] !== phrase[x]) {
            return false;
        }
    }
    return true;
}
