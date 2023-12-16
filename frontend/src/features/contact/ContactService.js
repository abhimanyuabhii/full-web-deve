import axios from 'axios';

export const ContactService = {
  postQuery: async (contactData) => {
    const response = await axios.post('api/v1/enquiry',contactData);
    return response.data;
  },
};

export default ContactService;

