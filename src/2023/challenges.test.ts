import { createChallengeMacro } from '~/createChallengeMacro';

const testChallenge = createChallengeMacro(2023);

run(testChallenge, 1, 'a');
run(testChallenge, 1, 'b');
run(testChallenge, 2, 'a');
run(testChallenge, 2, 'b');
run(testChallenge, 3, 'a');
run(testChallenge, 3, 'b');
run(testChallenge, 4, 'a');
