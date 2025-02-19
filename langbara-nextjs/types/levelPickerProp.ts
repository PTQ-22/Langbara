export default interface LevelPickerProps {
  selectedLevel: string;
  levelList: Array<string>;
  changeSelectedLevel: Function;
  selectedMode: number
}