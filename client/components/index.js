/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar';
export {Login, Signup} from './auth-form';
export {default as Main} from './main';
export {default as SelectTeam} from './select-team/select-team';
export {default as ChooseProject} from './choose-project/choose-project';
export {default as SelectCohort} from './select-cohort/select-cohort';
export {default as AddForm} from './add-form/add-form';
