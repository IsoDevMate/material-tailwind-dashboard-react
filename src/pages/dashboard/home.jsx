import React, { useState, useEffect } from "react";
import { orderBy, limit } from "firebase/firestore";
import { db } from "../../firebase";

import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";

import { DownloadOrdersReport } from "../../layouts/Downloadbtn";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "../../widgets/cards";
import { StatisticsChart } from "../../widgets/charts";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import { collection, getDocs, query, where} from "firebase/firestore";  
import { BanknotesIcon, UserPlusIcon, UsersIcon, ChartBarIcon } from "@heroicons/react/24/solid";

export function Home() {
  const [statisticsCards, setStatisticsCards] = useState([]);
  const [ordersOverviewData, setOrdersOverviewData] = useState([]);
  /*
  const rules = {
    rules: {
      "users": {
        ".read": "true", // Allow read access to the "users" collection
        ".write": "false"  // Disallow write access to the "users" collection
      },
      "orders": {
        ".read": "true", // Allow read access to the "orders" collection
        ".write": "false"  // Disallow write access to the "orders" collection
      }
      // Add rules for other collections as needed
    }
  };
  */
  /*
  db.app.firestore().setRules(JSON.stringify(rules))
    .then(() => {
      console.log('Firestore security rules have been set successfully');
    })
    .catch((error) => {
      console.error('Error setting Firestore security rules:', error);
    });
    */


  useEffect(() => {
    const fetchStatisticsCards = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        const totalUsers = usersSnapshot.size;
        console.log(totalUsers);
  
        const ordersSnapshot = await getDocs(collection(db, "orders"));
        const totalOrders = ordersSnapshot.size;
        console.log(totalOrders)
  
        const completedOrdersQuery = query(
          collection(db, "orders"),
          where("status", "==", "completed")
        );
        const completedOrdersSnapshot = await getDocs(completedOrdersQuery);
        const totalCompletedOrders = completedOrdersSnapshot.size;
  
        let totalIncome = 0;
        completedOrdersSnapshot.forEach((doc) => {
          totalIncome += doc.data().amount;
        });

        const statisticsCardsData = [
          {
            color: "gray",
            icon: BanknotesIcon,
            title: "Total Income",
            value: `$${totalIncome}`,
            footer: {
              color: "text-green-500",
              value: "+55%",
              label: "than last week",
            },
          },
          {
            color: "gray",
            icon: UsersIcon,
            title: "Total Users",
            value: totalUsers.toString(),
            footer: {
              color: "text-green-500",
              value: "+3%",
              label: "than last month",
            },
          },
          {
            color: "gray",
            icon: UserPlusIcon,
            title: "Total Orders",
            value: totalOrders.toString(),
            footer: {
              color: "text-red-500",
              value: "-2%",
              label: "than yesterday",
            },
          },
          {
            color: "gray",
            icon: ChartBarIcon,
            title: "Completed Orders",
            value: totalCompletedOrders.toString(),
            footer: {
              color: "text-green-500",
              value: "+5%",
              label: "than yesterday",
            },
          },
        ];

        setStatisticsCards(statisticsCardsData);
        await fetchOrdersOverviewData();
      } catch (error) {
        console.error("Error fetching statistics cards data:", error);
      }
    };

    fetchStatisticsCards();
  }, []);

  const fetchOrdersOverviewData = async () => {
    try {
      const ordersQuery = query(collection(db, "orders"), orderBy("paymentTime", "desc"), limit(5));
      const ordersSnapshot = await getDocs(ordersQuery);
      const ordersData = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        status: doc.data().status,
        paymentTime: doc.data().paymentTime.toDate(),
        amount: doc.data().amount,
      }));
      setOrdersOverviewData(ordersData);
    } catch (error) {
      console.error("Error fetching orders overview data:", error);
    }
  };

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCards.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>

     <div>
     <Card className="border border-blue-gray-100 shadow-sm w-110">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Orders Overview
            </Typography>
            <Typography
              variant="small"
              className="flex items-center gap-1 font-normal text-blue-gray-600"
            >
              <ArrowUpIcon
                strokeWidth={3}
                className="h-3.5 w-3.5 text-green-500"
              />
              <strong>24%</strong> this month
            </Typography>
          </CardHeader>
          <CardBody className="pt-0 w-110">
          {ordersOverviewData.map((order, key) => (
               <div key={order.id} className="flex items-start gap-4 py-3">
                 <div
                   className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${
                     key === ordersOverviewData.length - 1 ? "after:h-0" : "after:h-4/6"
                   }`}
                 >
                   <div className="flex items-center justify-center bg-blue-gray-50 rounded-full w-8 h-8">
                     <Typography variant="small" color="blue-gray" className="font-medium">
                       {order.status.charAt(0).toUpperCase()}
                     </Typography>
                   </div>
                 </div>
                 <div>
                   <Typography variant="small" color="blue-gray" className="block font-medium">
                     Order ID: {order.id}
                   </Typography>
                   <Typography as="span" variant="small" className="text-xs font-medium text-blue-gray-500">
                     Payment Time: {order.paymentTime.toLocaleString()}
                   </Typography>
                   <Typography as="span" variant="small" className="text-xs font-medium text-blue-gray-500">
                     Amount: ${order.amount}
                   </Typography>
                 </div>
               </div>
             ))}
             </CardBody>
           </Card>
     </div>
     < DownloadOrdersReport />
    </div>
  );
}

export default Home;