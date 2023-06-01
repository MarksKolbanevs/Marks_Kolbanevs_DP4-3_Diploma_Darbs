import './info-table.scss';

  
interface AdminInfoTableProps {
    headers: string[];
}

interface UserData {
  photo: string,
  _id: string,
  phone: number,
  email: string,
  name: string,
  passwordHash: string,
}
  
  export const AdminInfoTable: React.FC<AdminInfoTableProps> = ({ headers }) => {
    return (
      <table className='info-table'>
        <thead>
          <tr className='table-header'>
            {headers.map((item) => (<th key={item}>{item}</th>))}
          </tr>
        </thead>
        <tbody>
          {/* <tr className='px18 w500'>
            <td>Plume avenue</td>
            <td>Plume avenuie is...</td>
            <td>Plume avenuie is...</td>
          </tr> */}
        </tbody>
      </table>
    );
};