import React, { useState, useEffect } from "react";
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
//import { DownloadIcon } from "@heroicons/react/24/solid";
import { DownloadOrdersReport } from "../../layouts/Downloadbtn";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "../../widgets/cards";
import { StatisticsChart } from "../../widgets/charts";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import { collection, getDocs, query, where} from "firebase/firestore";
import { db } from "../../firebase";  
import { BanknotesIcon, UserPlusIcon, UsersIcon, ChartBarIcon } from "@heroicons/react/24/solid";

export function Home() {
  const [statisticsCards, setStatisticsCards] = useState([]);

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
      } catch (error) {
        console.error("Error fetching statistics cards data:", error);
      }
    };

    fetchStatisticsCards();
  }, []);

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
     < DownloadOrdersReport />
    </div>
  );
}

export default Home;