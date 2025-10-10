import { TableInterface } from "@/types";

export default function Table({ headers, children, ...props }: TableInterface) {
    return (
        <div className="table-container">
            <table className="">
                <thead className="">
                    <tr>
                        {headers.map((header, index) => {
                        if (typeof header === 'string') {
                            return <th key={index}>{header}</th>;
                        }

                        return (
                            <th key={index} style={{ textAlign: header.align ?? 'left' }}>
                                {header.title}
                            </th>
                        );
                    })}
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    );
}
