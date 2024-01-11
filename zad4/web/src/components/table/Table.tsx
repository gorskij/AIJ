import React from "react";
import styles from "./Table.module.css"

function Table({rows}: { rows: any[][] }) {
    return (
        <table>
            {
                rows.map((row, rowIndex) => {
                    if (rowIndex === 0)
                        return (
                            <thead key={rowIndex + "table"}>
                            <tr className={styles.row} key={rowIndex}>
                                {
                                    row.map(((cell, cellIndex) => {
                                        return <td className={styles.cell} key={cellIndex}>{cell}</td>
                                    }))
                                }
                            </tr>
                            </thead>
                        )

                    return (
                        <tbody key={rowIndex + "table"}>
                        <tr className={styles.row}>
                            {
                                row.map(((cell, cellIndex) => {
                                    return <td className={styles.cell} key={cellIndex}>{cell}</td>
                                }))
                            }
                        </tr>
                        </tbody>
                    )
                })
            }
        </table>
    );
}

export default Table;
