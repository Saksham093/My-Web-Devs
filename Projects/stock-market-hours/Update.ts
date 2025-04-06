import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Switch,
    Typography,
    Box,
    CssBaseline,
    Select,
    MenuItem,
    Button,
    TextField,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import moment from "moment-timezone";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Howl } from "howler";

const notificationSound = new Howl({
    src: ["/notification.mp3"],
    volume: 1.0,
    html5: true,  // Ensures it plays properly in the browser
});


const timeZones = [
    { label: "Indian Standard Time (IST)", value: "Asia/Kolkata" },
    { label: "Eastern Time (ET)", value: "America/New_York" },
    { label: "Central European Time (CET)", value: "Europe/Berlin" },
    { label: "Greenwich Mean Time (GMT)", value: "Etc/GMT" },
    { label: "Japan Standard Time (JST)", value: "Asia/Tokyo" },
    { label: "China Standard Time (CST)", value: "Asia/Shanghai" },
    { label: "Hong Kong Time (HKT)", value: "Asia/Hong_Kong" },
    { label: "Australian Eastern Time (AET)", value: "Australia/Sydney" },
];



const StockMarketTable = () => {
    const [data, setData] = useState([]);
    const [darkMode, setDarkMode] = useState(true);
    const [selectedTimeZone, setSelectedTimeZone] = useState("Asia/Kolkata");
    const [currentTime, setCurrentTime] = useState(moment().tz(selectedTimeZone).format("hh:mm:ss A"));
    const [alerts, setAlerts] = useState([]);
    const [alertTime, setAlertTime] = useState("");

    useEffect(() => {
        fetch("/stockData.json")
            .then((response) => response.json())
            .then((jsonData) => setData(jsonData))
            .catch((error) => console.error("Error fetching stock data:", error));
    }, []);

    const [timeLeft, setTimeLeft] = useState({});

    useEffect(() => {
        const timer = setInterval(() => {
            const newTimeLeft = {};
            data.forEach((market) => {
                const now = moment().tz(selectedTimeZone);
                const closeTime = moment.tz(market.closeTimeIST, "hh:mm A", "Asia/Kolkata").tz(selectedTimeZone);
                if (closeTime.isBefore(now)) {
                    newTimeLeft[market.exchange] = "Market Closed";
                } else {
                    const duration = moment.duration(closeTime.diff(now));
                    newTimeLeft[market.exchange] = `${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`;
                }
            });
            setTimeLeft(newTimeLeft);
        }, 1000);
        return () => clearInterval(timer);
    }, [selectedTimeZone, data]);



    const convertTime = (timeIST) => {
        return moment(timeIST, "hh:mm A").tz(selectedTimeZone).format("hh:mm A");
    };

    const calculateTimeLeft = (closeTimeIST) => {
        const now = moment().tz(selectedTimeZone);
        const closeTime = moment.tz(closeTimeIST, "hh:mm A", "Asia/Kolkata").tz(selectedTimeZone);
        if (closeTime.isBefore(now)) {
            return "Market Closed";
        }
        const duration = moment.duration(closeTime.diff(now));
        return `${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`;
    };

    const isMarketOpen = (openTimeIST, closeTimeIST) => {
        const now = moment().tz(selectedTimeZone);
        const openTime = moment.tz(openTimeIST, "hh:mm A", "Asia/Kolkata").tz(selectedTimeZone);
        const closeTime = moment.tz(closeTimeIST, "hh:mm A", "Asia/Kolkata").tz(selectedTimeZone);

        if (closeTime.isBefore(openTime)) {
            closeTime.add(1, "day");
        }
        return now.isBetween(openTime, closeTime);
    };

    const checkMarketStatus = () => {
        data.forEach((market) => {
            const now = moment().tz(selectedTimeZone);
            const openTime = moment.tz(market.openTimeIST, "hh:mm A", "Asia/Kolkata").tz(selectedTimeZone);
            const closeTime = moment.tz(market.closeTimeIST, "hh:mm A", "Asia/Kolkata").tz(selectedTimeZone);

            if (now.format("HH:mm") === openTime.format("HH:mm")) {
                toast.success(`${market.exchange} is now OPEN!`);
                notificationSound.play();
            }

            if (now.format("HH:mm") === closeTime.format("HH:mm")) {
                toast.error(`${market.exchange} has CLOSED.`);
                notificationSound.play();
            }
        });
    };


    const checkUserAlerts = () => {
        const now = moment().tz(selectedTimeZone).format("HH:mm");
        alerts.forEach((alert) => {
            if (alert === now) {
                toast.info(`User Alert: It's ${alert}!`);
                notificationSound.play();
            }
        });
    };

    const addAlert = () => {
        if (alertTime) {
            setAlerts([...alerts, alertTime]);
            toast.success(`Alert set for ${alertTime}`);
        }
    };

    const theme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
        },
        typography: {
            fontFamily: "Arial, sans-serif",
        },
    });


    // <Typography variant="h3" style={{ fontWeight: 'bold' }}>World Stock Market Hours</Typography>

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    textAlign: "center",
                    p: 2,
                    backgroundColor: darkMode ? "#222" : "#f5f5f5",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                }}
            >
                {/* Title and Live Clock */}
                <Box sx={{ textAlign: "left" }}>
                    <Typography variant="h4" sx={{ fontWeight: "bold", color: darkMode ? "#fff" : "#000" }}>
                        World Stock Market Hours
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: darkMode ? "#ffcc00" : "#000" }}>
                        Current Time: {currentTime} ({selectedTimeZone})
                    </Typography>
                </Box>

                {/* Time Zone Selector */}
                <Select
                    value={selectedTimeZone}
                    onChange={(e) => setSelectedTimeZone(e.target.value)}
                    sx={{
                        m: 1,
                        p: 1,
                        backgroundColor: darkMode ? "#333" : "#fff",
                        color: darkMode ? "#fff" : "#000",
                        border: "1px solid",
                        borderColor: darkMode ? "#aaa" : "#ccc",
                        "& .MuiSvgIcon-root": { color: darkMode ? "#fff" : "#000" },
                        "&:focus": { backgroundColor: darkMode ? "#444" : "#eee" },
                    }}
                >
                    {timeZones.map((tz, index) => (
                        <MenuItem
                            key={index}
                            value={tz.value}
                            sx={{
                                backgroundColor: darkMode ? "#444" : "#fff",
                                color: darkMode ? "#fff" : "#000",
                                "&:hover": { backgroundColor: darkMode ? "#555" : "#ddd" },
                                "&:focus": { backgroundColor: darkMode ? "#666" : "#ccc" },
                            }}
                        >
                            {tz.label}
                        </MenuItem>
                    ))}
                </Select>

                {/* Dark Mode Toggle */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body2" sx={{ mr: 1, color: darkMode ? "#fff" : "#000" }}>
                        {darkMode ? "Dark Mode" : "Light Mode"}
                    </Typography>
                    <Switch
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                        color="default"
                        sx={{
                            "& .MuiSwitch-track": { backgroundColor: darkMode ? "#f5f5f5" : "#333" },
                            "& .MuiSwitch-thumb": { backgroundColor: darkMode ? "#1976d2" : "#fff" },
                        }}
                    />
                </Box>
            </Box>

            {/* Add space between the header and the table */}
            <Box sx={{ marginTop: 3 }} />


            <TableContainer
                component={Paper}
                sx={{
                    maxWidth: "90%",
                    margin: "auto",
                    overflowX: "auto",
                    boxShadow: 3,
                    borderRadius: 2,
                    border: darkMode ? "2px solid white" : "2px solid #ccc", // White border in dark mode, subtle in light mode
                }}
            >

                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{
                                    backgroundColor: darkMode ? "#222" : "#1976d2",
                                    color: "#fff",
                                    fontWeight: "bold",
                                    minWidth: "200px",
                                    position: "sticky",
                                    left: 0,
                                    zIndex: 2,
                                }}
                            >
                                Stock Exchange
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Country</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Opening Time</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Closing Time</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Local Time Zone</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Time Left</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => {
                            const isOpen = isMarketOpen(row.openTimeIST, row.closeTimeIST);
                            return (
                                <TableRow
                                    key={index}
                                    sx={{
                                        backgroundColor: isOpen ? "rgba(76, 175, 80, 0.3)" : "inherit",
                                        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.1)" },
                                    }}
                                >
                                    <TableCell
                                        sx={{
                                            minWidth: "200px",
                                            position: "sticky",
                                            left: 0,
                                            zIndex: 1,
                                            backgroundColor: darkMode ? "#333" : "#fff",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {row.exchange}
                                    </TableCell>
                                    <TableCell>{row.country}</TableCell>
                                    <TableCell>{convertTime(row.openTimeIST)}</TableCell>
                                    <TableCell>{convertTime(row.closeTimeIST)}</TableCell>
                                    <TableCell>{row.localTimeZone}</TableCell>
                                    <TableCell>{timeLeft[row.exchange] || "Calculating..."}</TableCell>

                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ textAlign: "center", p: 3 }}>
                <Typography variant="h6">Set an Alert</Typography>
                <TextField type="time" onChange={(e) => setAlertTime(e.target.value)} sx={{ m: 1 }} />
                <Button variant="contained" onClick={addAlert}>Add Alert</Button>
            </Box>

            <Box sx={{ textAlign: "center", p: 2, mt: 3, backgroundColor: darkMode ? "#222" : "#f5f5f5" }}>
                <Typography variant="body2">© 2025 World Stock Market Tracker. All Rights Reserved.</Typography>
            </Box>
        </ThemeProvider>
    );
};

export default StockMarketTable;
