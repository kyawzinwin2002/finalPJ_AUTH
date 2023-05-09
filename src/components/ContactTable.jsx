import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { Table } from "@mantine/core";
import { useDeleteContactMutation, useGetContactQuery, useGetSingleContactQuery } from '../redux/api/contact';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Button, rem } from "@mantine/core";
import { useDispatch, useSelector } from 'react-redux';
import { ADD_CONTACT } from '../redux/services/contactSlice';

const ContactTable = () => {
    const token = Cookies.get("token")
    const {data} = useGetContactQuery(token)
    const [deleteContact] = useDeleteContactMutation()
    const dispatch = useDispatch()
    const contacts = useSelector(state => state?.contactSlice?.contacts)
    const searchTerm = useSelector((state) => state.contactSlice.searchTerm);

    useEffect(() => {
      dispatch(ADD_CONTACT(data?.contacts?.data))
    },[data])
    
    const deleteHandler = async(id) => {
        const data = await deleteContact({id,token})
        
    };
    
    // console.log(data?.contacts?.data);
    
   
  return (
    <div className="">
      <Link to={"/create"}>
        <button className=" bg-blue-500 text-white px-6 py-1 rounded-sm shadow-md">
          Create Contact
        </button>
      </Link>
      <div className=" mt-5">
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {contacts?.filter(item => item?.name.toLowerCase().includes(searchTerm.toLowerCase()))
            
            .map((contact) => {
              return (
                <tr key={contact.id}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.address}</td>
                  <td>
                    <Menu width={200} shadow="md">
                      <Menu.Target>
                        <Button variant="outline">...</Button>
                      </Menu.Target>

                      <Menu.Dropdown>
                        <Link to={`/info/${contact?.id}`}>
                          <Menu.Item component="a">
                            <p className=" cursor-pointer">Info</p>
                          </Menu.Item>
                        </Link>

                        <Menu.Item component="a" target="_blank">
                          <p
                            onClick={() => deleteHandler(contact?.id)}
                            className=" cursor-pointer text-red-500"
                          >
                            Delete
                          </p>
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ContactTable