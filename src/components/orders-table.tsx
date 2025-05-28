"use client"

interface Order {
  id: string
  orderId: string
  date: string
  customer: string
  payment: "Paid" | "Pending" | "Failed"
  status: "Unfulfilled" | "Fulfilled" | "Cancelled"
  price: string
  selected: boolean
}

interface OrdersTableProps {
  darkMode?: boolean
  searchQuery: string
  onToggleSelection: (orderId: string) => void
}

export default function OrdersTable({ darkMode = false, searchQuery, onToggleSelection }: OrdersTableProps) {
  const orders: Order[] = [
    {
      id: "1",
      orderId: "#10010",
      date: "17 Nov 2020",
      customer: "Nicolas",
      payment: "Paid",
      status: "Unfulfilled",
      price: "$14.90",
      selected: false,
    },
    {
      id: "2",
      orderId: "#10011",
      date: "15 Oct 2020",
      customer: "Stanley Bryant",
      payment: "Paid",
      status: "Unfulfilled",
      price: "$14.90",
      selected: false,
    },
    {
      id: "3",
      orderId: "#10012",
      date: "04 Feb 2020",
      customer: "Ronald Bennett",
      payment: "Paid",
      status: "Unfulfilled",
      price: "$14.90",
      selected: false,
    },
    {
      id: "4",
      orderId: "#10013",
      date: "01 Sep 2020",
      customer: "Don Lynch",
      payment: "Paid",
      status: "Unfulfilled",
      price: "$14.90",
      selected: false,
    },
    {
      id: "5",
      orderId: "#10014",
      date: "18 Mar 2020",
      customer: "Rosa",
      payment: "Paid",
      status: "Unfulfilled",
      price: "$14.90",
      selected: false,
    },
    {
      id: "6",
      orderId: "#10015",
      date: "16 Nov 2020",
      customer: "Wesley Chambers",
      payment: "Paid",
      status: "Unfulfilled",
      price: "$14.90",
      selected: false,
    },
    {
      id: "7",
      orderId: "#10016",
      date: "04 Nov 2020",
      customer: "Jared Carlson",
      payment: "Paid",
      status: "Unfulfilled",
      price: "$14.90",
      selected: false,
    },
  ]

  const filteredOrders = orders.filter(
    (order) =>
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.date.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getPaymentBadgeColor = (payment: string) => {
    switch (payment) {
      case "Paid":
        return darkMode ? "bg-green-900 text-green-300" : "bg-green-100 text-green-800"
      case "Pending":
        return darkMode ? "bg-yellow-900 text-yellow-300" : "bg-yellow-100 text-yellow-800"
      case "Failed":
        return darkMode ? "bg-red-900 text-red-300" : "bg-red-100 text-red-800"
      default:
        return darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-800"
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Fulfilled":
        return darkMode ? "bg-green-900 text-green-300" : "bg-green-100 text-green-800"
      case "Unfulfilled":
        return darkMode ? "bg-orange-900 text-orange-300" : "bg-orange-100 text-orange-800"
      case "Cancelled":
        return darkMode ? "bg-red-900 text-red-300" : "bg-red-100 text-red-800"
      default:
        return darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div
      className={`rounded-lg overflow-hidden ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      {/* Desktop Table */}
      <div className="hidden lg:block">
        <table className="min-w-full">
          <thead className={`${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
            <tr>
              <th scope="col" className="relative w-12 px-6 sm:w-16 sm:px-8">
                <span className="sr-only">Select</span>
              </th>
              <th
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                Order
              </th>
              <th
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                Date
              </th>
              <th
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                Customer
              </th>
              <th
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                Payment
              </th>
              <th
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                Status
              </th>
              <th
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                Price
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order.id}
                className={`${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"} transition-colors duration-200`}
              >
                <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                  <input
                    type="checkbox"
                    checked={order.selected}
                    onChange={() => onToggleSelection(order.id)}
                    className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm font-medium text-blue-600 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                    {order.orderId}
                  </div>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
                  {order.date}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
                  {order.customer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentBadgeColor(order.payment)}`}
                  >
                    {order.payment}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(order.status)}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"}`}
                >
                  {order.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    className={`p-2 rounded-md transition-colors duration-200 ${
                      darkMode
                        ? "text-gray-400 hover:text-white hover:bg-gray-600"
                        : "text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden border-gray-100">
        <div className="space-y-4 p-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className={`rounded-lg p-4 transition-colors duration-200 ${
                darkMode ? "bg-gray-700" : "bg-white"
              }`}
            >
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={order.selected}
                  onChange={() => onToggleSelection(order.id)}
                  className="mt-1 h-4 w-4 rounded border-gray-100 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <p
                        className={`text-sm font-medium text-blue-600 ${darkMode ? "text-blue-400" : "text-blue-600"}`}
                      >
                        {order.orderId}
                      </p>
                      <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
                        {order.date} • {order.customer}
                      </p>
                    </div>
                    <button
                      className={`p-1 rounded-md transition-colors duration-200 ${
                        darkMode
                          ? "text-gray-400 hover:text-white hover:bg-gray-600"
                          : "text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex space-x-2">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentBadgeColor(order.payment)}`}
                      >
                        {order.payment}
                      </span>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <span className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>{order.price}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Results Summary */}
      <div className="mt-4 px-6 pb-4">
        <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Showing {filteredOrders.length} of {orders.length} orders
        </p>
      </div>
    </div>
  )
}