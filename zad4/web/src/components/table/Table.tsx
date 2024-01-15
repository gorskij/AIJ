import React from "react";
import styles from "./Table.module.css"

function Table({headerRow, columnSizes, rows}: { headerRow: any[], columnSizes: number[], rows: any[][] }) {

    if (headerRow.length !== 0)
        return (
            <table className={styles.table}>
                <colgroup>
                    {
                        columnSizes.map((column, index) => {
                            return <col style={{width: column + "%"}} key={"Column" + index}/>
                        })
                    }
                </colgroup>
                <thead>
                <tr className={styles.headerRow}>
                    {
                        headerRow.map(((cell, cellIndex) => {
                            return <td className={styles.cell} key={cellIndex}>{cell}</td>
                        }))
                    }
                </tr>
                </thead>


                {rows.length !== 0 && <tbody className={styles.table}>
                {
                    rows.map((row, rowIndex) => {
                        return (
                            <tr className={styles.row} key={"Row" + rowIndex}>
                                {
                                    row.map(((cell, cellIndex) => {
                                        return <td className={styles.cell} key={cellIndex}>{cell}</td>
                                    }))
                                }
                            </tr>
                        )
                    })
                }
                </tbody>}
            </table>
        );
}

export default Table;
