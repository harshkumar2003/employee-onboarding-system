import { Box, Paper, Stack, Typography, Grid } from "@mui/material";
import Card from "../components/Card";
import cardData from "../data/cardData.json";

const Dashboard = () => {
  const name = "Harsh Kumar";

  return (
    <Stack spacing={3.25}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          p: { xs: 2.5, md: 3.25 },
          border: "1px solid",
          borderColor: "rgba(148, 163, 184, 0.24)",
          bgcolor: "common.white",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,0.98) 100%)",
          boxShadow: "0 18px 46px rgba(15, 23, 42, 0.06)",
        }}
      >
        <Typography
          variant="body2"
          fontWeight={700}
          color="primary.main"
          letterSpacing={1}
        >
          Welcome Back
        </Typography>

        <Typography
          variant="h4"
          component="h1"
          sx={{
            mt: 0.75,
            fontWeight: 800,
            color: "text.primary",
            letterSpacing: -0.6,
          }}
        >
          Hi, {name}
        </Typography>

        <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </Typography>

        <Box
          sx={{
            mt: 2,
            width: 92,
            height: 5,
            borderRadius: 999,
            background: "linear-gradient(90deg, #1d4ed8 0%, #0ea5e9 100%)",
          }}
        />
      </Paper>

      <Grid container spacing={3} justifyContent="center">
        {cardData.map((item) => (
          <Grid
            key={item.id}
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card
              title={item.title}
              value={item.value}
              change={item.change}
              description={item.description}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default Dashboard;
