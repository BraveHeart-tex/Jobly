CREATE TABLE UserHighlightedSkills (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userSkillId INT NOT NULL,
    `order` INT NOT NULL,
    CONSTRAINT FK_UserSkillId FOREIGN KEY (userSkillId) REFERENCES UserSkills(id) ON DELETE CASCADE
);

CREATE INDEX UserSkillId_index ON UserHighlightedSkills(userSkillId);
