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

<table>
    <tr>
        <td width="200px">Create Account</td width="200px">
        <td width="200px">Login</td width="200px">
    </tr>
    <tr>
        <td width="200px"><img src="./github_assets/authentication_create_account.gif" width="200px" /></td width="200px">
        <td width="200px"><img src="./github_assets/authentication_login.gif" width="200px" /></td width="200px">
    </tr>
</table>

### Create Workouts

<table>
    <tr>
        <td width="200px">New workout, add exercises</td width="200px">
        <td width="200px">Add sets, notes, rest</td width="200px">
        <td width="200px">Duplicate, delete, drag</td width="200px">
        <td width="200px">Filter Exercises, delete</td width="200px">
    </tr>
    <tr>
        <td width="200px"><img src="./github_assets/create_workouts_new_workout_add_exercises.gif"/></td width="200px">
        <td width="200px"><img src="./github_assets/create_workouts_add_sets_notes_rest.gif" /></td width="200px">
        <td width="200px"><img src="./github_assets/create_workouts_duplicate_delete_drag.gif" /></td width="200px">
        <td width="200px"><img src="./github_assets/create_workouts_filter_exercises_delete.gif" /></td width="200px">
</tr>
</table>

### Use Workouts

<table>
    <tr>
        <td width="200px">Start workout, Navigate</td width="200px">
        <td width="200px">Enter your stats</td width="200px">
        <td width="200px">Complete workout, Save</td width="200px">
        <td width="200px">View workout summary</td width="200px">
    </tr>
    <tr>
        <td width="200px"><img src="./github_assets/use_workouts_start_workout_navigate.gif" width="200px" /></td width="200px">
        <td width="200px"><img src="./github_assets/use_workouts_enter_your_stats.gif" width="200px" /></td width="200px">
        <td width="200px"><img src="./github_assets/use_workouts_complete_workout_save.gif" width="200px" /></td width="200px">
        <td width="200px"><img src="./github_assets/use_workouts_view_workout_summary.gif" width="200px" /></td width="200px">
    </tr>
</table>

### Profile & Analytics

<table>
    <tr>
        <td width="200px">View past performance</td width="200px">
        <td width="200px">Edit your profile</td width="200px">
        <td width="200px">See exercise progress</td width="200px">
        <td width="200px">Compare exercises</td width="200px">
    </tr>
    <tr>
        <td width="200px"><img src="./github_assets/profile_analytics_view_past_performance.gif" width="200px" /></td width="200px">
        <td width="200px"><img src="./github_assets/profile_analytics_edit_your_profile.gif" width="200px" /></td width="200px">
        <td width="200px"><img src="./github_assets/profile_analytics_see_exercise_progress.gif" width="200px" /></td width="200px">
        <td width="200px"><img src="./github_assets/profile_analytics_compare_exercises.gif" width="200px" /></td width="200px">
    </tr>
</table>

### Navigation & Error Handling

<table>
    <tr>
        <td width="200px">Navigation</td width="200px">
        <td width="200px">Error handling</td width="200px">
    </tr>
    <tr>
        <td width="200px"><img src="./github_assets/navigation.gif" width="200px" /></td width="200px">
        <td width="200px"><img src="./github_assets/error_handling.png" width="200px" /></td width="200px">
    </tr>
</table>

### Social Sharing

<table>
    <tr>
        <td width="200px">Search for and add friends</td width="200px">
        <td width="200px">See posts from multiple friends</td width="200px">
        <td width="200px">View summary, duplicate workout</td width="200px">
        <td width="200px">Unfollow friends</td width="200px">
    </tr>
    <tr>
        <td width="200px"><img src="./github_assets/social_sharing_search_for_and_add_friends.gif" width="200px" /></td width="200px">
        <td width="200px"><img src="./github_assets/social_sharing_see_posts_from_multiple_friends.gif" width="200px" /></td width="200px">
        <td width="200px"><img src="./github_assets/social_sharing_view_summary_duplicate_workout.gif" width="200px" /></td width="200px">
        <td width="200px"><img src="./github_assets/social_sharing_unfollow_friends.gif" width="200px" /></td width="200px">
    </tr>
</table>
