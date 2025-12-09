import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
  MenuItem,
  Stack,
} from "@mui/material";
import {
  getProfile,
  getProfileStatus,
  createProfile,
  updateProfile,
  deleteProfile,
} from "../api/profileApi.js";

const genderOptions = ["MALE", "FEMALE"];
const activityOptions = [
  "SEDENTARY",
  "LIGHT",
  "MODERATE",
  "ACTIVE",
  "VERY_ACTIVE",
];
const goalOptions = ["FAT_LOSS", "MAINTENANCE", "MUSCLE_GAIN"];
const dietOptions = ["OMNIVORE", "VEGETARIAN", "VEGAN", "KETO"];

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    age: "",
    weight: "",
    height: "",
    gender: "",
    activityLevel: "",
    goal: "",
    dietaryPreference: "",
  });
  const [hasProfile, setHasProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const statusRes = await getProfileStatus();
      const statusRest = statusRes.data;
      const exists = !!statusRest?.data;
      setHasProfile(exists);

      if (exists) {
        const res = await getProfile();
        const rest = res.data;
        const p = rest.data;
        setProfile({
          age: p.age ?? "",
          weight: p.weight ?? "",
          height: p.height ?? "",
          gender: p.gender ?? "",
          activityLevel: p.activityLevel ?? "",
          goal: p.goal ?? "",
          dietaryPreference: p.dietaryPreference ?? "",
        });
      } else {
        setProfile({
          age: "",
          weight: "",
          height: "",
          gender: "",
          activityLevel: "",
          goal: "",
          dietaryPreference: "",
        });
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    const payload = {
      age: Number(profile.age),
      weight: Number(profile.weight),
      height: Number(profile.height),
      gender: profile.gender,
      activityLevel: profile.activityLevel,
      goal: profile.goal,
      dietaryPreference: profile.dietaryPreference,
    };

    try {
      const res = hasProfile
        ? await updateProfile(payload)
        : await createProfile(payload);
      const rest = res.data;
      setMessage(rest?.message || "Profile saved.");
      setHasProfile(true);
    } catch (err) {
      console.error(err);
      setError("Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setError("");
    setMessage("");
    try {
      await deleteProfile();
      setMessage("Profile deleted.");
      setHasProfile(false);
      setProfile({
        age: "",
        weight: "",
        height: "",
        gender: "",
        activityLevel: "",
        goal: "",
        dietaryPreference: "",
      });
    } catch (err) {
      console.error(err);
      setError("Failed to delete profile.");
    }
  };

  if (loading) {
    return <Typography>Loading profile...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Profile
      </Typography>

      <Card>
        <CardContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {message && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSave}>
            <Stack spacing={2}>
              <TextField
                label="Age"
                name="age"
                type="number"
                value={profile.age}
                onChange={handleChange}
                required
              />
              <TextField
                label="Weight (kg)"
                name="weight"
                type="number"
                value={profile.weight}
                onChange={handleChange}
                required
              />
              <TextField
                label="Height (cm)"
                name="height"
                type="number"
                value={profile.height}
                onChange={handleChange}
                required
              />

              <TextField
                select
                label="Gender"
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                required
              >
                {genderOptions.map((g) => (
                  <MenuItem key={g} value={g}>
                    {g}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="Activity Level"
                name="activityLevel"
                value={profile.activityLevel}
                onChange={handleChange}
                required
              >
                {activityOptions.map((a) => (
                  <MenuItem key={a} value={a}>
                    {a}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="Goal"
                name="goal"
                value={profile.goal}
                onChange={handleChange}
                required
              >
                {goalOptions.map((g) => (
                  <MenuItem key={g} value={g}>
                    {g}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="Dietary Preference"
                name="dietaryPreference"
                value={profile.dietaryPreference}
                onChange={handleChange}
                required
              >
                {dietOptions.map((d) => (
                  <MenuItem key={d} value={d}>
                    {d}
                  </MenuItem>
                ))}
              </TextField>

              <Stack direction="row" spacing={2}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={saving}
                >
                  {hasProfile ? "Update Profile" : "Create Profile"}
                </Button>

                {hasProfile && (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleDelete}
                  >
                    Delete Profile
                  </Button>
                )}
              </Stack>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;
