import { createChallengeMacro } from '~/createChallengeMacro';

const testChallenge = createChallengeMacro(2022);

run(testChallenge, 1, 'a');
run(testChallenge, 1, 'b');
run(testChallenge, 2, 'a');
run(testChallenge, 2, 'b');
