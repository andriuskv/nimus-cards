export default function StudyScoreBar({ score, name, className }) {
  const style = {
    "--width": `${score.total ? score[name] / score.total * 100 : 50}%`
  };

  return <div className={`score-bar score-${name}-bar${className ? ` ${className}` : ""}`} style={style}>{score[name]}</div>;
}
