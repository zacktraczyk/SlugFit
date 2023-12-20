![SlugFit Logo Header](./github_assets/SlugFit_Header.png)

# SlugFit - Plan Workouts

A simple cross platform (IOS and Android) app made with React Native.

## Environment Setup

1. Install Node
   https://nodejs.org/en/download/
2. Install Yarn
   https://classic.yarnpkg.com/lang/en/docs/install/

## App Installation

1. Clone this repository
2. Set githooks with `git config core.hooksPath ./.githooks`
3. Navigate to the root of the repository and run `yarn` which will install all the dependencies
4. Running `yarn start` will begin the development server
5. If you have XCode installed and an iPhone simulator, you can press `i` which will open the simulator and run the app.
   Otherwise, you have to install the Expo Go app on your phone and scan the QR code from the terminal with your camera
   to run the app on your phone in Expo Go. Make sure your phone and laptop are connected to the same wifi network to use the latter option.

## Commands

- `yarn start` to begin the development server
- `yarn ios` to run IOS simulator
- `yarn android` to run Android simulator

- `yarn lint` to lint code
- `yarn lint:fix` to fix simple linting errors
- `yarn format` to format code according to style guide

- `yarn test` to run unit tests

## Screenshots

### Authentication

<img src="./github_assets/authentication_create_account.gif" width="22%" />
<img src="./github_assets/authentication_login.gif" width="22%" />

### Create Workouts

<img src="./github_assets/create_workouts_new_workout_add_exercises.gif" width="22%" />
<img src="./github_assets/create_workouts_add_sets_notes_rest.gif" width="22%" />
<img src="./github_assets/create_workouts_duplicate_delete_drag.gif" width="22%" />
<img src="./github_assets/create_workouts_filter_exercises_delete.gif" width="22%" />

### Use Workouts

<img src="./github_assets/use_workouts_start_workout_navigate.gif" width="22%" />
<img src="./github_assets/use_workouts_enter_your_stats.gif" width="22%" />
<img src="./github_assets/use_workouts_complete_workout_save.gif" width="22%" />
<img src="./github_assets/use_workouts_view_workout_summary.gif" width="22%" />

### Profile & Analytics

<img src="./github_assets/profile_analytics_view_past_performance.gif" width="22%" />
<img src="./github_assets/profile_analytics_edit_your_profile.gif" width="22%" />
<img src="./github_assets/profile_analytics_see_exercise_progress.gif" width="22%" />
<img src="./github_assets/profile_analytics_compare_exercises.gif" width="22%" />

### Navigation & Error Handling

<img src="./github_assets/navigation.gif" width="22%" />
<img src="./github_assets/error_handling.png" width="22%" />

### Social Sharing

<img src="./github_assets/social_sharing_search_for_and_add_friends.gif" width="22%" />
<img src="./github_assets/social_sharing_see_posts_from_multiple_friends.gif" width="22%" />
<img src="./github_assets/social_sharing_view_summary_duplicate_workout.gif" width="22%" />
<img src="./github_assets/social_sharing_unfollow_friends.gif" width="22%" />
