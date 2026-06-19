
import fs from 'fs';

const content = fs.readFileSync('src/components/ui/input-group.tsx', 'utf8');
const lines = content.split('\n');

const start = 93; // InputGroup start line (1-indexed)
const end = 241;   // InputGroup end line

let componentContent = lines.slice(start - 1, end).join('\n');

function count(str, char) {
    return (str.match(new RegExp('\\' + char, 'g')) || []).length;
}

console.log('LBrace {:', count(componentContent, '{'));
console.log('RBrace }:', count(componentContent, '}'));
console.log('LParen (:', count(componentContent, '('));
console.log('RParen ):', count(componentContent, ')'));
console.log('LT <:', count(componentContent, '<'));
console.log('GT >:', count(componentContent, '>'));
