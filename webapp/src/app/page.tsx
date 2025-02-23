import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
} from "@mui/material";

const accentColor = "#2a9461";

const categories = [
  { title: "Movies", description: "Classic and modern films you already know" },
  { title: "Books", description: "Bestsellers and literary masterpieces" },
  { title: "Songs", description: "Popular tunes you might hum daily" },
  {
    title: "Cities",
    description: "Places you’ve visited or dream of traveling to",
  },
  { title: "People", description: "Historical figures and celebrities" },
  {
    title: "Board Games",
    description: "Popular tabletop games, from classics to modern hits",
  },
  {
    title: "Birds",
    description: "Common and exotic birds from around the world",
  },
  {
    title: "Paintings",
    description: "Famous artworks and masterpieces from various eras",
  },
  {
    title: "Recipes",
    description: "Delicious dishes and culinary delights from around the world",
  },
];

const LandingPage = () => {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: accentColor,
          color: "white",
          py: 8,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight="bold">
            Memorizing Your Seed Phrase Just Got Easier
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, opacity: 0.9 }}>
            Secure your crypto with our smart memory technique. No more
            struggling with random words!
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              mt: 4,
              bgcolor: "white",
              color: accentColor,
              fontWeight: "bold",
            }}
            href="/app"
          >
            Go to App
          </Button>
        </Container>
      </Box>

      {/* Feature Section */}
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          How It Works
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Our app converts your 12-word seed phrase into familiar categories,
          making it easier to remember.
        </Typography>

        <Grid container spacing={3} sx={{ mt: 4 }}>
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                variant="outlined"
                sx={{ height: "100%", borderColor: accentColor }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color={accentColor}
                  >
                    {category.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Security & CTA */}
      <Box sx={{ bgcolor: "#fff", py: 6 }}>
        <Container maxWidth="md">
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            gutterBottom
          >
            Offline & Secure
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Your seed phrase never leaves your device. The conversion happens
            entirely offline.
          </Typography>

          <Typography
            variant="h5"
            align="center"
            fontWeight="bold"
            sx={{ mt: 4 }}
          >
            Currently Supports 12 Words
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            We currently support 12-word seed phrases. 24-word support is coming
            soon!
          </Typography>

          <Box textAlign="center" sx={{ mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              sx={{ bgcolor: accentColor, fontWeight: "bold" }}
              href="/app"
            >
              Go to App
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
