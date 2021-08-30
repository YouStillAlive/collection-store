import { useState, useContext, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { getUsers, blockUsers, deleteUsers } from '../shared/http/userApi.js';
import { Context } from '../index.js';
import { observer } from 'mobx-react-lite';
// import { useHistory } from 'react-router-dom';
import logo from '../favicon.ico';
import { FormattedMessage } from 'react-intl';

const Admin = observer(() => {
    const [data, setData] = useState([]);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);

    const { user } = useContext(Context);
    //const history = useHistory();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setData(await getUsers());
        } catch (e) {
            console.log(e);
        }
    }

    const handleSelectAll = e => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(data.map(li => li.id));
        if (isCheckAll) {
            setIsCheck([]);
        }
    };

    const checkboxClick = e => {
        const { checked } = e.target;
        const id = parseInt(e.target.id);
        if (!checked) {
            setIsCheck(Object.values(isCheck).filter(item => item !== id));
        }
        else {
            setIsCheck([...isCheck, id]);
        }
    };

    const unblockHandler = async e => {
        try {
            if (isCheck.length > 0) {
                await blockUsers(isCheck, false);
                await fetchData();
            }
        } catch (e) {
            console.log(e.response.data.message);
        }
    }

    const blockHandler = async e => {
        try {
            if (isCheck.length > 0) {
                await blockUsers(isCheck, true);
                await fetchData();
                if (isCheck.indexOf(user.user.id) !== -1) {
                }
            }
        } catch (e) {
            console.log(e.response.data.message);
        }
    }

    const deleteHandler = async e => {
        try {
            if (isCheck.length > 0) {
                await deleteUsers(isCheck);
                setIsCheck([]);
                await fetchData();
                if (isCheck.indexOf(user.user.id) !== -1) {
                }
            }
        } catch (e) {
            console.log(e.response.data.message);
        }
    }

    return (
        <main className="container content p-4">
            <div>
                <img alt="unblock" width="40" onClick={unblockHandler} className="p-1 unblockHover" src="https://www.pngrepo.com/png/193933/512/unlock.png" />
                <img alt="block" width="40" onClick={blockHandler} className="p-1 blockHover" src={logo} />
                <img alt="delete" width="36" onClick={deleteHandler} className="p-1 deleteHover" src="https://www.clipartmax.com/png/full/84-842915_delete-icon-png-red.png" />
            </div>
            <Table striped bordered hover responsive borderless >
                <thead>
                    <tr>
                        <td>
                            <input
                                type="checkbox"
                                className="checkboxPosition"
                                onChange={handleSelectAll}
                                checked={isCheckAll}
                            />
                        </td>
                        <th>
                            Id
                        </th>
                        <th>
                            <FormattedMessage id="admin-page.name" />
                        </th>
                        <th>
                            <FormattedMessage id="admin-page.username" />
                        </th>
                        <th>
                            <FormattedMessage id="admin-page.role" />
                        </th>
                        <th>
                            <FormattedMessage id="admin-page.status" />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(data => {
                            let status = "active";
                            if (data.isBlocked)
                                status = "blocked";
                            data.createdAt = data.createdAt.replace('.000Z', '').replace('T', ' ');
                            data.updatedAt = data.updatedAt.replace('.000Z', '').replace('T', ' ');
                            let role;
                            if (data.role === 'USER') {
                                role = 'ADMIN'
                            } else {
                                role = data.role;
                            }
                            return (<tr key={data.id}>
                                <td>
                                    <input
                                        id={data.id}
                                        type="checkbox"
                                        onChange={checkboxClick}
                                        checked={isCheck.includes(data.id)}
                                        className="checkboxPosition" />
                                </td>
                                <td>
                                    {data.id}
                                </td>
                                <td>
                                    {data.name}
                                </td>
                                <td>
                                    {data.email}
                                </td>
                                <td>
                                    {user.user.role !== data.role && <select class="form-select" aria-label="Default select example">
                                        <option value={data.role}>{data.role}</option>
                                        <option value={role}>{role}</option>
                                    </select>}
                                    {
                                        user.user.role === data.role && <span>{user.user.role}</span>
                                    }
                                </td>
                                <td>
                                    {status}
                                </td>
                            </tr>);
                        }
                        )
                    }
                </tbody>
            </Table>
        </main>
    );
});

export default Admin;