import moment from 'moment';

// need to create test data to use for diff filters, heance array
// valueOf enables us to get a number or normal timestamp back

const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const altFilters = {
    text: 'bills',
    sortBy: 'amount',
    startDate: moment(0),
    endDate: moment(0).add(3, 'days')
};

export { filters, altFilters };