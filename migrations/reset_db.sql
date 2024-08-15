SET @tables = NULL;
SELECT GROUP_CONCAT('`', table_name, '`') INTO @tables
FROM information_schema.tables
WHERE table_schema = '!!!DB_NAME_HERE!!!';

SET @tables = CONCAT('DROP TABLE IF EXISTS ', @tables);
        PREPARE stmt FROM @tables;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;